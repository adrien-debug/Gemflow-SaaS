package io.hearstcorporation.atelier.config.frontend;

import io.hearstcorporation.atelier.config.frontend.property.FrontendProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(FrontendProperties.class)
public class FrontendConfig {
}
