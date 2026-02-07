package io.hearstcorporation.atelier.config.organization;

import io.hearstcorporation.atelier.config.organization.property.OrganizationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(OrganizationProperties.class)
public class OrganizationConfig {
}
