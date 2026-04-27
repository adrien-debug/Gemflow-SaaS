package io.hearstcorporation.atelier.service.aiagent.v2.tool;

import com.fasterxml.jackson.databind.JsonNode;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;

/**
 * A tool an agent can invoke. Implementations are auto-discovered as Spring beans.
 *
 * <p>Contract :
 * <ul>
 *   <li>{@link #name()} must be unique and stable (LLM references it by name).</li>
 *   <li>{@link #toolDefinition()} provides the JSON schema sent to the LLM.</li>
 *   <li>{@link #execute} receives validated input + a server-built {@link ToolContext}.</li>
 *   <li>The LLM never controls tenantId/userId — those live in {@code context}.</li>
 * </ul>
 */
public interface AgentTool {

    String name();

    ToolDefinition toolDefinition();

    /**
     * Run the tool. Return a {@link ToolExecutionResult} — never throw user-visible errors;
     * convert exceptions into {@link ToolExecutionResult#error(String)} so the LLM can recover.
     */
    ToolExecutionResult execute(JsonNode input, ToolContext context);
}
