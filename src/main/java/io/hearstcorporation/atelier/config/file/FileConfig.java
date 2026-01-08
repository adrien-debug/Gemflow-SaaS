package io.hearstcorporation.atelier.config.file;

import io.hearstcorporation.atelier.config.file.property.FileProperties;
import io.hearstcorporation.atelier.config.file.property.S3Properties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;

@Configuration
@EnableConfigurationProperties(FileProperties.class)
public class FileConfig {

    /**
     * S3 configuration is only enabled when {@code file.source=S3}.
     * This avoids binding/validating S3 properties in local mode.
     */
    @Configuration
    @ConditionalOnProperty(prefix = "file", name = "source", havingValue = "S3")
    @EnableConfigurationProperties(S3Properties.class)
    static class S3FileConfig {

        @Bean
        public AwsCredentials awsCredentials(S3Properties s3Properties) {
            return AwsBasicCredentials.create(s3Properties.getAccessKey(), s3Properties.getSecretKey());
        }

        @Bean
        public StaticCredentialsProvider staticCredentialsProvider(AwsCredentials awsCredentials) {
            return StaticCredentialsProvider.create(awsCredentials);
        }
    }
}
