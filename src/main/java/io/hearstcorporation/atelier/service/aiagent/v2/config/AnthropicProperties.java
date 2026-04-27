package io.hearstcorporation.atelier.service.aiagent.v2.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "anthropic")
public class AnthropicProperties {

    private String apiKey;
    private String baseUrl = "https://api.anthropic.com";
    private String apiVersion = "2023-06-01";
    private String defaultModel = "claude-sonnet-4-6";
    private String plannerModel = "claude-opus-4-7";
    private String fastModel = "claude-haiku-4-5";
    private int maxTokens = 4096;
    private int maxToolIterations = 10;
    private int requestTimeoutSeconds = 120;
    private boolean enablePromptCaching = true;

    public boolean isConfigured() {
        return apiKey != null && !apiKey.isBlank();
    }
}
