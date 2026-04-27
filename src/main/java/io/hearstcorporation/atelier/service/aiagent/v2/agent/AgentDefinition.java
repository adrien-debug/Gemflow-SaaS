package io.hearstcorporation.atelier.service.aiagent.v2.agent;

import java.util.Set;

/**
 * Defines a flavour of agent : its identity, system prompt, model preference,
 * and the subset of tools it is allowed to use.
 *
 * <p>Implementations are auto-discovered as Spring beans by {@link AgentRegistry}.
 * Each agent must have a unique {@link #name()}.</p>
 */
public interface AgentDefinition {

    /** Stable, lowercase identifier (e.g. "default", "pricing"). Returned in audit logs. */
    String name();

    /** System prompt sent as the first system block. Will be cached if prompt-caching is enabled. */
    String systemPrompt();

    /**
     * Tools this agent may call, by tool name. Return {@code null} for "all available".
     * Returning an empty set means "no tools" (text-only assistant).
     */
    default Set<String> allowedToolNames() {
        return null;
    }

    /** Optional model override. Return {@code null} to use the default-model from properties. */
    default String preferredModel() {
        return null;
    }
}
