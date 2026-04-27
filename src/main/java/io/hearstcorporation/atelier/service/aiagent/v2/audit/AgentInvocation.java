package io.hearstcorporation.atelier.service.aiagent.v2.audit;

import io.hearstcorporation.atelier.model.BaseModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "agent_invocation")
public class AgentInvocation extends BaseModel {

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "conversation_id", nullable = false)
    private UUID conversationId;

    @Column(name = "agent_name", nullable = false, length = 64)
    private String agentName;

    @Column(name = "model", nullable = false, length = 64)
    private String model;

    @Column(name = "user_message", nullable = false, columnDefinition = "TEXT")
    private String userMessage;

    @Column(name = "final_response", columnDefinition = "TEXT")
    private String finalResponse;

    @Column(name = "tools_used", columnDefinition = "TEXT")
    private String toolsUsed;

    @Column(name = "input_tokens")
    private Integer inputTokens;

    @Column(name = "output_tokens")
    private Integer outputTokens;

    @Column(name = "cache_read_tokens")
    private Integer cacheReadTokens;

    @Column(name = "cache_creation_tokens")
    private Integer cacheCreationTokens;

    @Column(name = "cost_micro_usd")
    private Long costMicroUsd;

    @Column(name = "duration_ms")
    private Integer durationMs;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 24)
    private AgentInvocationStatus status;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}
