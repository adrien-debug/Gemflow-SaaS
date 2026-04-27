package io.hearstcorporation.atelier.service.aiagent.v2.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AnthropicErrorResponse(String type, ApiError error) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record ApiError(String type, String message) {}
}
