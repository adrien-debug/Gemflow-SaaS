package io.hearstcorporation.atelier.config.keycloak.property;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "keycloak")
public class KeycloakProperties {

    @NotNull
    private String url;

    @NotNull
    private String realm;

    @NotNull
    private String organization;

    @NotNull
    private String clientId;

    @NotNull
    private String clientSecret;
}
