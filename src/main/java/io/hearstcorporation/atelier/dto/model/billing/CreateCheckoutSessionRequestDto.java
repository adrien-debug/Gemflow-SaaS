package io.hearstcorporation.atelier.dto.model.billing;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCheckoutSessionRequestDto {

    /**
     * Direct Stripe Price ID (preferred for backend-to-backend calls).
     */
    private String priceId;

    /**
     * Lookup key to resolve a Price ID from configuration (e.g. basic-monthly).
     */
    private String priceKey;

    /**
     * Optional email; Stripe Checkout can prefill / create the customer.
     */
    private String customerEmail;

    /**
     * Optional success/cancel URLs (fallbacks are derived from frontend.url).
     */
    private String successUrl;
    private String cancelUrl;

    /**
     * Seats quantity for subscription (e.g. 1-10).
     */
    @Min(value = 1, message = "quantity must be >= 1")
    @Max(value = 10, message = "quantity must be <= 10")
    private Long quantity;

    @AssertTrue(message = "Either priceId or priceKey must be provided")
    public boolean isPriceProvided() {
        return isNotBlank(priceId) || isNotBlank(priceKey);
    }

    private static boolean isNotBlank(String s) {
        return s != null && !s.trim().isEmpty();
    }
}


