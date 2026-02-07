package io.hearstcorporation.atelier.config.security.property;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "cors")
public class CorsProperties {

    @NotNull
    @NotEmpty
    private List<String> allowedOrigins;

    @NotNull
    @NotEmpty
    private List<String> allowedMethods;

    @NotNull
    @NotEmpty
    private List<String> allowedHeaders;
}
