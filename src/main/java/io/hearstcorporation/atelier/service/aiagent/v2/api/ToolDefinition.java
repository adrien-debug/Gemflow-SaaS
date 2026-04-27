package io.hearstcorporation.atelier.service.aiagent.v2.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ToolDefinition(
        String name,
        String description,
        @JsonProperty("input_schema") JsonNode inputSchema,
        @JsonProperty("cache_control") ContentBlock.CacheControl cacheControl
) {
    public static ToolDefinition of(String name, String description, JsonNode inputSchema) {
        return new ToolDefinition(name, description, inputSchema, null);
    }

    public ToolDefinition withCacheControl(ContentBlock.CacheControl cc) {
        return new ToolDefinition(name, description, inputSchema, cc);
    }
}
