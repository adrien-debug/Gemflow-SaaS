package io.hearstcorporation.atelier.service.aiagent.v2.orchestrator;

import io.hearstcorporation.atelier.service.aiagent.v2.artifact.Artifact;

import java.util.List;
import java.util.UUID;

/**
 * Aggregated outcome of an agent run (one user turn, possibly several tool iterations).
 */
public record AgentRunResult(
        UUID conversationId,
        String agentName,
        String model,
        String finalText,
        List<Artifact> artifacts,
        List<String> toolsUsed,
        int iterations,
        int inputTokens,
        int outputTokens,
        int cacheReadTokens,
        int cacheCreationTokens,
        long costMicroUsd,
        long durationMs,
        Status status,
        String errorMessage
) {
    public enum Status { SUCCESS, ERROR, MAX_ITERATIONS }
}
