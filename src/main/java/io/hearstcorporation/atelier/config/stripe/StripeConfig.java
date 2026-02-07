package io.hearstcorporation.atelier.config.stripe;

import io.hearstcorporation.atelier.config.stripe.property.StripeProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(StripeProperties.class)
public class StripeConfig {
}


