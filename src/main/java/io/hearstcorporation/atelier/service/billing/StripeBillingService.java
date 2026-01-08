package io.hearstcorporation.atelier.service.billing;

import io.hearstcorporation.atelier.dto.model.billing.CheckoutSessionDto;
import io.hearstcorporation.atelier.dto.model.billing.CreateCheckoutSessionRequestDto;
import io.hearstcorporation.atelier.dto.model.billing.PortalSessionDto;

public interface StripeBillingService {

    CheckoutSessionDto createCheckoutSession(CreateCheckoutSessionRequestDto request);

    PortalSessionDto createBillingPortalSession(String customerId, String returnUrl);

    void handleWebhook(String payload, String stripeSignatureHeader);
}


