package io.hearstcorporation.atelier.config.organization.property;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "organization")
public class OrganizationProperties {

    @NotNull
    private String name;
}
