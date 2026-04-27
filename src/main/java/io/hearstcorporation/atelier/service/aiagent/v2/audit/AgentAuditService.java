package io.hearstcorporation.atelier.service.aiagent.v2.audit;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.hearstcorporation.atelier.service.aiagent.v2.orchestrator.AgentRunResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class AgentAuditService {

    private final AgentInvocationRepository repository;
    private final ObjectMapper mapper;

    @Transactional
    public void record(Long tenantId, Long userId, String userMessage, AgentRunResult result) {
        try {
            AgentInvocation row = new AgentInvocation();
            row.setTenantId(tenantId != null ? tenantId : 1L);
            row.setUserId(userId);
            row.setConversationId(result.conversationId());
            row.setAgentName(result.agentName());
            row.setModel(result.model());
            row.setUserMessage(truncate(userMessage, 8000));
            row.setFinalResponse(truncate(result.finalText(), 16000));
            row.setToolsUsed(serialiseTools(result.toolsUsed()));
            row.setInputTokens(result.inputTokens());
            row.setOutputTokens(result.outputTokens());
            row.setCacheReadTokens(result.cacheReadTokens());
            row.setCacheCreationTokens(result.cacheCreationTokens());
            row.setCostMicroUsd(result.costMicroUsd());
            row.setDurationMs((int) Math.min(Integer.MAX_VALUE, result.durationMs()));
            row.setStatus(switch (result.status()) {
                case SUCCESS -> AgentInvocationStatus.SUCCESS;
                case ERROR -> AgentInvocationStatus.ERROR;
                case MAX_ITERATIONS -> AgentInvocationStatus.MAX_ITERATIONS;
            });
            row.setErrorMessage(truncate(result.errorMessage(), 2000));
            row.setCreatedAt(Instant.now());

            repository.save(row);
        } catch (RuntimeException e) {
            log.warn("Failed to record agent invocation audit row (continuing)", e);
        }
    }

    private String serialiseTools(java.util.List<String> tools) {
        if (tools == null || tools.isEmpty()) return null;
        try {
            return mapper.writeValueAsString(tools);
        } catch (Exception e) {
            return tools.toString();
        }
    }

    private String truncate(String value, int max) {
        if (value == null) return null;
        return value.length() <= max ? value : value.substring(0, max);
    }
}
