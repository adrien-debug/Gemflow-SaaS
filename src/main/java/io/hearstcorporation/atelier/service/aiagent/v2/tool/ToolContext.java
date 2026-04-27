package io.hearstcorporation.atelier.service.aiagent.v2.tool;

import io.hearstcorporation.atelier.security.model.AuthRole;
import io.hearstcorporation.atelier.service.aiagent.v2.artifact.RunState;

import java.util.UUID;

/**
 * Server-built execution context handed to every tool.
 * The LLM cannot influence tenantId/userId/role/conversationId — they come from the authenticated request.
 *
 * <p>{@link #runState()} is mutable and shared across all tool invocations of a single run :
 * it is the channel through which {@code emit_artifact} accumulates visual artifacts.</p>
 */
public record ToolContext(
        Long tenantId,
        Long userId,
        AuthRole userRole,
        UUID conversationId,
        RunState runState
) {}
