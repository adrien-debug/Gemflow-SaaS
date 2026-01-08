package io.hearstcorporation.atelier.config.stripe.property;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "stripe")
public class StripeProperties {

    /**
     * Secret API key (starts with sk_...).
     * Do not log this value.
     */
    private String apiKey;

    /**
     * Webhook signing secret (starts with whsec_...).
     * Do not log this value.
     */
    private String webhookSecret;

    /**
     * Stripe Price IDs, keyed by business name (e.g. basic-monthly, pro-yearly).
     */
    private Map<String, String> prices = new HashMap<>();
}


