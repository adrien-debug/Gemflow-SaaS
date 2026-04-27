package io.hearstcorporation.atelier.service.aiagent.v2.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@Configuration
@EnableConfigurationProperties(AnthropicProperties.class)
public class AnthropicConfig {

    public static final String CLIENT_BEAN = "anthropicRestClient";

    @Bean(CLIENT_BEAN)
    public RestClient anthropicRestClient(AnthropicProperties props) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(15));
        factory.setReadTimeout(Duration.ofSeconds(props.getRequestTimeoutSeconds()));

        return RestClient.builder()
                .baseUrl(props.getBaseUrl())
                .requestFactory(factory)
                .defaultHeader("anthropic-version", props.getApiVersion())
                .defaultHeader("content-type", "application/json")
                .build();
    }
}
