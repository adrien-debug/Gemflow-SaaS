package io.hearstcorporation.atelier.dto.response;

import io.hearstcorporation.atelier.service.aiagent.v2.artifact.Artifact;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AgentChatResponseDto {
    private UUID conversationId;
    private String message;
    private String agent;
    private String model;
    private String status;        // SUCCESS, ERROR, MAX_ITERATIONS
    private String errorMessage;
    private List<String> toolsUsed;
    /** Structured visual artifacts emitted by the agent during this run. */
    private List<Artifact> artifacts;
    private int iterations;
    private long durationMs;
    private Usage usage;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Usage {
        private int inputTokens;
        private int outputTokens;
        private int cacheReadTokens;
        private int cacheCreationTokens;
        private long costMicroUsd;
    }
}
