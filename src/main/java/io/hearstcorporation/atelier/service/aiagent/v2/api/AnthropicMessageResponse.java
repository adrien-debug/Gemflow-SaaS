package io.hearstcorporation.atelier.service.aiagent.v2.api;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AnthropicMessageResponse(
        String id,
        String type,
        String role,
        String model,
        List<ContentBlock> content,
        @JsonProperty("stop_reason") String stopReason,
        @JsonProperty("stop_sequence") String stopSequence,
        Usage usage
) {

    public boolean wantsTool() {
        return "tool_use".equals(stopReason);
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Usage(
            @JsonProperty("input_tokens") int inputTokens,
            @JsonProperty("output_tokens") int outputTokens,
            @JsonProperty("cache_read_input_tokens") Integer cacheReadInputTokens,
            @JsonProperty("cache_creation_input_tokens") Integer cacheCreationInputTokens
    ) {
        public int cacheRead() { return cacheReadInputTokens == null ? 0 : cacheReadInputTokens; }
        public int cacheCreation() { return cacheCreationInputTokens == null ? 0 : cacheCreationInputTokens; }
    }
}
