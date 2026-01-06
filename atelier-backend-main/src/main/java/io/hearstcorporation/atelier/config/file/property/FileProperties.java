package io.hearstcorporation.atelier.config.file.property;

import io.hearstcorporation.atelier.model.file.Source;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "file")
public class FileProperties {

    @NotNull
    private Source source;
}
