package io.hearstcorporation.atelier.config.file.property;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;
import software.amazon.awssdk.regions.Region;

@Getter
@Setter
@Validated
@ConfigurationProperties(prefix = "file.s3")
@ConditionalOnProperty(prefix = "file", name = "source", havingValue = "S3")
public class S3Properties {

    @NotNull
    private Region region;

    @NotNull
    private String bucket;

    @NotNull
    private String accessKey;

    @NotNull
    private String secretKey;
}
