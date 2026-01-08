package io.hearstcorporation.atelier.service.billing.impl;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.StripeObject;
import com.stripe.model.billingportal.Session;
import com.stripe.net.RequestOptions;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import io.hearstcorporation.atelier.config.tenant.TenantContext;
import io.hearstcorporation.atelier.config.frontend.property.FrontendProperties;
import io.hearstcorporation.atelier.config.stripe.property.StripeProperties;
import io.hearstcorporation.atelier.dto.model.billing.CheckoutSessionDto;
import io.hearstcorporation.atelier.dto.model.billing.CreateCheckoutSessionRequestDto;
import io.hearstcorporation.atelier.dto.model.billing.PortalSessionDto;
import io.hearstcorporation.atelier.dto.model.error.ErrorCode;
import io.hearstcorporation.atelier.exception.FeatureNotConfiguredException;
import io.hearstcorporation.atelier.exception.IllegalStateException;
import io.hearstcorporation.atelier.exception.InvalidDataException;
import io.hearstcorporation.atelier.exception.ServiceException;
import io.hearstcorporation.atelier.model.Tenant;
import io.hearstcorporation.atelier.model.billing.BillingSubscription;
import io.hearstcorporation.atelier.repository.billing.BillingSubscriptionRepository;
import io.hearstcorporation.atelier.service.billing.StripeBillingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StripeBillingServiceImpl implements StripeBillingService {

    private static final String DEFAULT_SUCCESS_PATH = "/billing/success";
    private static final String DEFAULT_CANCEL_PATH = "/billing/cancel";

    private final StripeProperties stripeProperties;
    private final FrontendProperties frontendProperties;
    private final BillingSubscriptionRepository billingSubscriptionRepository;

    @Override
    public CheckoutSessionDto createCheckoutSession(CreateCheckoutSessionRequestDto request) {
        String apiKey = requireApiKey();
        String priceId = resolvePriceId(request);
        Tenant.TenantPlan plan = resolvePlan(request, priceId);
        Long tenantId = TenantContext.getTenantId();
        Long quantity = request.getQuantity() != null ? request.getQuantity() : 1L;

        String successUrl = firstNonBlank(request.getSuccessUrl(), frontendProperties.getUrl() + DEFAULT_SUCCESS_PATH);
        String cancelUrl = firstNonBlank(request.getCancelUrl(), frontendProperties.getUrl() + DEFAULT_CANCEL_PATH);

        RequestOptions requestOptions = RequestOptions.builder()
                .setApiKey(apiKey)
                .build();

        SessionCreateParams.Builder params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl)
                .putMetadata("tenant_id", tenantId == null ? "" : tenantId.toString())
                .putMetadata("plan", plan == null ? "" : plan.name())
                .putMetadata("seats", quantity.toString())
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setPrice(priceId)
                        .setQuantity(quantity)
                        .build());

        if (isNotBlank(request.getCustomerEmail())) {
            params.setCustomerEmail(request.getCustomerEmail().trim());
        }

        try {
            com.stripe.model.checkout.Session session = com.stripe.model.checkout.Session.create(params.build(), requestOptions);

            log.info("Stripe Checkout session created (sessionId={}, tenantId={}, plan={})",
                    session.getId(),
                    tenantId,
                    plan == null ? "UNKNOWN" : plan.name());

            return CheckoutSessionDto.builder()
                    .id(session.getId())
                    .url(session.getUrl())
                    .build();
        } catch (StripeException ex) {
            log.error("Stripe Checkout session creation failed", ex);
            throw new ServiceException(ErrorCode.INTERNAL_SERVER_ERROR, "Stripe Checkout session creation failed", ex);
        }
    }

    @Override
    public PortalSessionDto createBillingPortalSession(String customerId, String returnUrl) {
        String apiKey = requireApiKey();
        if (!isNotBlank(customerId)) {
            throw new InvalidDataException(ErrorCode.INVALID_PARAMETERS, "customerId is required");
        }

        String effectiveReturnUrl = firstNonBlank(returnUrl, frontendProperties.getUrl());

        RequestOptions requestOptions = RequestOptions.builder()
                .setApiKey(apiKey)
                .build();

        com.stripe.param.billingportal.SessionCreateParams params = com.stripe.param.billingportal.SessionCreateParams.builder()
                .setCustomer(customerId.trim())
                .setReturnUrl(effectiveReturnUrl)
                .build();

        try {
            Session session = Session.create(params, requestOptions);
            log.info("Stripe Billing Portal session created (customerId={})", customerId.trim());
            return PortalSessionDto.builder()
                    .url(session.getUrl())
                    .build();
        } catch (StripeException ex) {
            log.error("Stripe Billing Portal session creation failed", ex);
            throw new ServiceException(ErrorCode.INTERNAL_SERVER_ERROR, "Stripe Billing Portal session creation failed", ex);
        }
    }

    @Override
    public void handleWebhook(String payload, String stripeSignatureHeader) {
        String webhookSecret = stripeProperties.getWebhookSecret();
        if (!isNotBlank(webhookSecret)) {
            throw new IllegalStateException("Stripe webhook secret is not configured (stripe.webhook-secret / STRIPE_WEBHOOK_SECRET)");
        }
        if (!isNotBlank(stripeSignatureHeader)) {
            throw new InvalidDataException(ErrorCode.INVALID_REQUEST, "Missing Stripe-Signature header");
        }
        if (!isNotBlank(payload)) {
            throw new InvalidDataException(ErrorCode.INVALID_REQUEST, "Missing webhook payload");
        }

        final Event event;
        try {
            event = Webhook.constructEvent(payload, stripeSignatureHeader, webhookSecret);
        } catch (SignatureVerificationException ex) {
            log.warn("Stripe webhook signature verification failed: {}", ex.getMessage());
            throw new InvalidDataException(ErrorCode.INVALID_REQUEST, "Invalid Stripe webhook signature");
        } catch (Exception ex) {
            log.error("Stripe webhook parsing failed", ex);
            throw new ServiceException(ErrorCode.INTERNAL_SERVER_ERROR, "Stripe webhook parsing failed", ex);
        }

        // Minimal handler for now: log event type and id.
        log.info("Stripe webhook received (eventId={}, type={})", event.getId(), event.getType());

        tryProcessWebhook(event);
    }

    private void tryProcessWebhook(Event event) {
        if (event.getType() == null) {
            return;
        }
        switch (event.getType()) {
            case "checkout.session.completed" -> handleCheckoutSessionCompleted(event);
            case "customer.subscription.updated", "customer.subscription.deleted" -> handleSubscriptionChanged(event);
            default -> {
                // no-op for now
            }
        }
    }

    private void handleCheckoutSessionCompleted(Event event) {
        EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
        Optional<StripeObject> obj = deserializer.getObject();
        if (obj.isEmpty() || !(obj.get() instanceof com.stripe.model.checkout.Session session)) {
            log.warn("Stripe webhook checkout.session.completed: unable to deserialize session (eventId={})", event.getId());
            return;
        }

        Map<String, String> metadata = session.getMetadata();
        Long tenantId = parseLong(metadata == null ? null : metadata.get("tenant_id"));
        Tenant.TenantPlan plan = parsePlan(metadata == null ? null : metadata.get("plan"));

        if (tenantId == null) {
            log.warn("Stripe webhook checkout.session.completed missing tenant_id metadata (eventId={}, sessionId={})",
                    event.getId(), session.getId());
            return;
        }

        String customerId = session.getCustomer();
        String subscriptionId = session.getSubscription();

        BillingSubscription billing = billingSubscriptionRepository.findByTenantId(tenantId)
                .orElseGet(() -> {
                    BillingSubscription created = new BillingSubscription();
                    created.setTenantId(tenantId);
                    created.setCreatedAt(Instant.now());
                    return created;
                });

        if (isNotBlank(customerId)) {
            billing.setStripeCustomerId(customerId);
        }
        if (isNotBlank(subscriptionId)) {
            billing.setStripeSubscriptionId(subscriptionId);
        }
        if (plan != null) {
            billing.setPlan(plan);
        }
        billing.setStatus("ACTIVE");
        billing.setUpdatedAt(Instant.now());

        billingSubscriptionRepository.save(billing);

        log.info("Stripe subscription stored (tenantId={}, subscriptionIdPresent={})",
                tenantId, isNotBlank(subscriptionId));
    }

    private void handleSubscriptionChanged(Event event) {
        EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
        Optional<StripeObject> obj = deserializer.getObject();
        if (obj.isEmpty() || !(obj.get() instanceof com.stripe.model.Subscription subscription)) {
            log.warn("Stripe webhook subscription change: unable to deserialize subscription (eventId={}, type={})",
                    event.getId(), event.getType());
            return;
        }

        String subscriptionId = subscription.getId();
        if (!isNotBlank(subscriptionId)) {
            return;
        }

        billingSubscriptionRepository.findByStripeSubscriptionId(subscriptionId)
                .ifPresentOrElse(billing -> {
                    if (isNotBlank(subscription.getCustomer())) {
                        billing.setStripeCustomerId(subscription.getCustomer());
                    }
                    billing.setStatus(normalizeStatus(subscription.getStatus()));
                    billing.setUpdatedAt(Instant.now());
                    billingSubscriptionRepository.save(billing);

                    log.info("Stripe subscription status updated (tenantId={}, status={})",
                            billing.getTenantId(), billing.getStatus());
                }, () -> log.warn("Stripe subscription event for unknown subscriptionId (subscriptionId={}, eventType={})",
                        subscriptionId, event.getType()));
    }

    private static String normalizeStatus(String status) {
        if (status == null) return null;
        return status.trim().toUpperCase();
    }

    private Tenant.TenantPlan resolvePlan(CreateCheckoutSessionRequestDto request, String resolvedPriceId) {
        if (isNotBlank(request.getPriceKey())) {
            return planFromPriceKey(request.getPriceKey().trim());
        }
        Map<String, String> prices = stripeProperties.getPrices();
        if (prices == null || prices.isEmpty() || !isNotBlank(resolvedPriceId)) {
            return null;
        }
        for (Map.Entry<String, String> entry : prices.entrySet()) {
            if (resolvedPriceId.equals(entry.getValue())) {
                return planFromPriceKey(entry.getKey());
            }
        }
        return null;
    }

    private Tenant.TenantPlan planFromPriceKey(String key) {
        if (key == null) return null;
        String lower = key.trim().toLowerCase();
        if (lower.startsWith("standard")) return Tenant.TenantPlan.BASIC;
        if (lower.startsWith("basic")) return Tenant.TenantPlan.BASIC;
        if (lower.startsWith("pro")) return Tenant.TenantPlan.PRO;
        if (lower.startsWith("enterprise")) return Tenant.TenantPlan.ENTERPRISE;
        return null;
    }

    private Tenant.TenantPlan parsePlan(String plan) {
        if (!isNotBlank(plan)) return null;
        try {
            return Tenant.TenantPlan.valueOf(plan.trim().toUpperCase());
        } catch (Exception ex) {
            return null;
        }
    }

    private static Long parseLong(String value) {
        if (!isNotBlank(value)) return null;
        try {
            return Long.parseLong(value.trim());
        } catch (Exception ex) {
            return null;
        }
    }

    private String resolvePriceId(CreateCheckoutSessionRequestDto request) {
        if (isNotBlank(request.getPriceId())) {
            return request.getPriceId().trim();
        }

        String key = request.getPriceKey() == null ? null : request.getPriceKey().trim();
        if (!isNotBlank(key)) {
            throw new InvalidDataException(ErrorCode.INVALID_PARAMETERS, "Either priceId or priceKey must be provided");
        }

        Map<String, String> prices = stripeProperties.getPrices();
        String resolved = prices == null ? null : prices.get(key);
        if (!isNotBlank(resolved)) {
            throw new InvalidDataException(ErrorCode.INVALID_PARAMETERS, "Unknown priceKey: " + key);
        }
        return resolved.trim();
    }

    private String requireApiKey() {
        String apiKey = stripeProperties.getApiKey();
        if (!isNotBlank(apiKey)) {
            throw new FeatureNotConfiguredException("Stripe Billing", "STRIPE_API_KEY");
        }
        return apiKey;
    }

    private static boolean isNotBlank(String s) {
        return s != null && !s.trim().isEmpty();
    }

    private static String firstNonBlank(String first, String fallback) {
        return isNotBlank(first) ? first.trim() : fallback;
    }
}


