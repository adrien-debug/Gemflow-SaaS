package io.hearstcorporation.atelier.config.frontend.property;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.time.ZoneId;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "frontend")
public class FrontendProperties {

    @NotNull
    @NotEmpty
    private String url;

    @NotNull
    @NotEmpty
    private String newPasswordPath;

    @NotNull
    @NotEmpty
    private String restorePasswordPath;

    @NotNull
    private ZoneId timezone;
}
