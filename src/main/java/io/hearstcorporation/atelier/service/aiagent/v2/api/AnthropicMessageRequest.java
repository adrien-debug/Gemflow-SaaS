package io.hearstcorporation.atelier.service.aiagent.v2.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record AnthropicMessageRequest(
        String model,
        @JsonProperty("max_tokens") int maxTokens,
        List<ContentBlock> system,
        List<AnthropicMessage> messages,
        List<ToolDefinition> tools,
        Double temperature
) {}
