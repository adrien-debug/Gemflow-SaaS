package io.hearstcorporation.atelier.service.billing;

import io.hearstcorporation.atelier.config.frontend.property.FrontendProperties;
import io.hearstcorporation.atelier.config.stripe.property.StripeProperties;
import io.hearstcorporation.atelier.dto.model.billing.CreateCheckoutSessionRequestDto;
import io.hearstcorporation.atelier.model.Tenant;
import io.hearstcorporation.atelier.repository.billing.BillingSubscriptionRepository;
import io.hearstcorporation.atelier.service.billing.impl.StripeBillingServiceImpl;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Guardrail test: plan resolution is purely local (no Stripe calls).
 */
class StripeBillingServiceImplPlanTest {

    @Test
    void resolvesPlanFromPriceKey() {
        StripeProperties stripeProperties = new StripeProperties();
        stripeProperties.setPrices(Map.of(
                "basic-monthly", "price_basic",
                "pro-yearly", "price_pro"
        ));
        FrontendProperties frontendProperties = new FrontendProperties();
        frontendProperties.setUrl("http://localhost");
        frontendProperties.setNewPasswordPath("/new-password");
        frontendProperties.setRestorePasswordPath("/restore-password");
        frontendProperties.setTimezone(java.time.ZoneId.of("Europe/Paris"));

        BillingSubscriptionRepository repo = null; // not used in this test
        StripeBillingServiceImpl service = new StripeBillingServiceImpl(stripeProperties, frontendProperties, repo);

        CreateCheckoutSessionRequestDto req = new CreateCheckoutSessionRequestDto();
        req.setPriceKey("basic-monthly");

        // Resolve indirectly by calling package-visible logic through reflection is overkill;
        // Instead we assert the metadata plan logic via resolvePlan with priceId resolved.
        // Here: resolvePriceId will resolve to "price_basic", and resolvePlan should be BASIC.
        String priceId = invokeResolvePriceId(service, req);
        Tenant.TenantPlan plan = invokeResolvePlan(service, req, priceId);

        assertEquals(Tenant.TenantPlan.BASIC, plan);
    }

    private static String invokeResolvePriceId(StripeBillingServiceImpl service, CreateCheckoutSessionRequestDto req) {
        try {
            var m = StripeBillingServiceImpl.class.getDeclaredMethod("resolvePriceId", CreateCheckoutSessionRequestDto.class);
            m.setAccessible(true);
            return (String) m.invoke(service, req);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static Tenant.TenantPlan invokeResolvePlan(StripeBillingServiceImpl service, CreateCheckoutSessionRequestDto req, String priceId) {
        try {
            var m = StripeBillingServiceImpl.class.getDeclaredMethod("resolvePlan", CreateCheckoutSessionRequestDto.class, String.class);
            m.setAccessible(true);
            return (Tenant.TenantPlan) m.invoke(service, req, priceId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}


