package io.hearstcorporation.atelier.service.aiagent.v2.client;

import io.hearstcorporation.atelier.service.aiagent.v2.api.AnthropicErrorResponse;
import io.hearstcorporation.atelier.service.aiagent.v2.api.AnthropicMessageRequest;
import io.hearstcorporation.atelier.service.aiagent.v2.api.AnthropicMessageResponse;
import io.hearstcorporation.atelier.service.aiagent.v2.config.AnthropicConfig;
import io.hearstcorporation.atelier.service.aiagent.v2.config.AnthropicProperties;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Slf4j
@Component
public class AnthropicClient {

    private final RestClient restClient;
    private final AnthropicProperties props;

    public AnthropicClient(@Qualifier(AnthropicConfig.CLIENT_BEAN) RestClient restClient,
                           AnthropicProperties props) {
        this.restClient = restClient;
        this.props = props;
    }

    /**
     * Single non-streaming /v1/messages call. Throws AnthropicApiException on error.
     */
    public AnthropicMessageResponse createMessage(AnthropicMessageRequest request) {
        if (!props.isConfigured()) {
            throw new AnthropicApiException("ANTHROPIC_API_KEY is not configured", null);
        }

        long started = System.currentTimeMillis();
        try {
            AnthropicMessageResponse response = restClient.post()
                    .uri("/v1/messages")
                    .header("x-api-key", props.getApiKey())
                    .body(request)
                    .retrieve()
                    .body(AnthropicMessageResponse.class);

            long elapsed = System.currentTimeMillis() - started;
            log.debug("Anthropic /v1/messages OK in {}ms (model={}, stop={}, in={}, out={})",
                    elapsed,
                    response != null ? response.model() : null,
                    response != null ? response.stopReason() : null,
                    response != null && response.usage() != null ? response.usage().inputTokens() : 0,
                    response != null && response.usage() != null ? response.usage().outputTokens() : 0);
            return response;

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            String body = e.getResponseBodyAsString();
            String message = extractErrorMessage(body, e);
            log.warn("Anthropic API HTTP {} : {}", e.getStatusCode(), message);
            throw new AnthropicApiException("Anthropic API error " + e.getStatusCode() + " : " + message, e);
        } catch (RestClientException e) {
            log.warn("Anthropic API call failed", e);
            throw new AnthropicApiException("Anthropic API call failed : " + e.getMessage(), e);
        }
    }

    private String extractErrorMessage(String body, Exception fallback) {
        if (body == null || body.isBlank()) {
            return fallback.getMessage();
        }
        try {
            AnthropicErrorResponse parsed = new com.fasterxml.jackson.databind.ObjectMapper()
                    .readValue(body, AnthropicErrorResponse.class);
            if (parsed != null && parsed.error() != null && parsed.error().message() != null) {
                return parsed.error().message();
            }
        } catch (Exception ignored) {
            // fall through
        }
        return body.length() > 500 ? body.substring(0, 500) : body;
    }

    public static class AnthropicApiException extends RuntimeException {
        public AnthropicApiException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}
