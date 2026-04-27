package io.hearstcorporation.atelier.service.aiagent.v2.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

/**
 * Polymorphic content block used by Anthropic /v1/messages.
 * The {@code type} field discriminates : "text", "tool_use", "tool_result".
 * All other fields are nullable and only populated for the relevant type.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ContentBlock(
        String type,

        // type=text  (assistant or user)
        String text,

        // type=tool_use  (assistant)
        String id,
        String name,
        JsonNode input,

        // type=tool_result  (user)
        @JsonProperty("tool_use_id") String toolUseId,
        Object content,
        @JsonProperty("is_error") Boolean isError,

        // optional prompt-cache marker on any block
        @JsonProperty("cache_control") CacheControl cacheControl
) {
    public static ContentBlock text(String text) {
        return new ContentBlock("text", text, null, null, null, null, null, null, null);
    }

    public static ContentBlock toolResult(String toolUseId, String content, boolean isError) {
        return new ContentBlock("tool_result", null, null, null, null, toolUseId, content, isError, null);
    }

    public boolean isText() {
        return "text".equals(type);
    }

    public boolean isToolUse() {
        return "tool_use".equals(type);
    }

    public record CacheControl(String type) {
        public static CacheControl ephemeral() {
            return new CacheControl("ephemeral");
        }
    }
}
