package io.hearstcorporation.atelier.service.aiagent.v2.tool;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

/** Tiny helper to compile inline JSON schema strings into a {@link JsonNode}. */
public final class JsonSchema {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private JsonSchema() {}

    public static JsonNode parse(String json) {
        try {
            return MAPPER.readTree(json);
        } catch (Exception e) {
            throw new IllegalStateException("Invalid JSON schema literal: " + json, e);
        }
    }
}
