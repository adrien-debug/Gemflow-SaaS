package io.hearstcorporation.atelier.config.email.property;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "email.properties")
@ConditionalOnProperty(prefix = "email", name = "enable", havingValue = "true")
public class EmailProperties {

    @NotNull
    @NotEmpty
    private String host;

    @NotNull
    private Integer port;

    @NotNull
    @NotEmpty
    private String username;

    @NotNull
    @NotEmpty
    private String password;

    @NotNull
    @NotEmpty
    private String protocol;

    @NotNull
    @NotEmpty
    private String sender;
}
