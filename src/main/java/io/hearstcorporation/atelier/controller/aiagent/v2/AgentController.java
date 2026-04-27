package io.hearstcorporation.atelier.controller.aiagent.v2;

import io.hearstcorporation.atelier.config.tenant.TenantContext;
import io.hearstcorporation.atelier.dto.request.AgentChatRequestDto;
import io.hearstcorporation.atelier.dto.response.AgentChatResponseDto;
import io.hearstcorporation.atelier.security.SecurityProvider;
import io.hearstcorporation.atelier.security.model.AuthRole;
import io.hearstcorporation.atelier.security.model.AuthUser;
import io.hearstcorporation.atelier.service.aiagent.v2.agent.AgentDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.agent.AgentRegistry;
import io.hearstcorporation.atelier.service.aiagent.v2.artifact.RunState;
import io.hearstcorporation.atelier.service.aiagent.v2.audit.AgentAuditService;
import io.hearstcorporation.atelier.service.aiagent.v2.orchestrator.AgentOrchestrator;
import io.hearstcorporation.atelier.service.aiagent.v2.orchestrator.AgentRunResult;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolContext;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v2/agents")
@RequiredArgsConstructor
public class AgentController {

    private final AgentOrchestrator orchestrator;
    private final AgentRegistry agentRegistry;
    private final AgentAuditService auditService;

    @PostMapping("/chat")
    public AgentChatResponseDto chat(@RequestBody @Valid AgentChatRequestDto request) {
        AuthUser auth = SecurityProvider.getCurrentUser();
        Long userId = auth != null ? auth.userId() : SecurityProvider.getCurrentUserId();
        AuthRole role = auth != null ? auth.role() : null;
        Long tenantId = TenantContext.getTenantId();
        UUID conversationId = request.getConversationId() != null ? request.getConversationId() : UUID.randomUUID();

        AgentDefinition agent = agentRegistry.resolve(request.getAgent());
        RunState runState = new RunState();
        ToolContext context = new ToolContext(tenantId, userId, role, conversationId, runState);

        log.info("agent.v2.chat tenant={} user={} conv={} agent={}",
                tenantId, userId, conversationId, agent.name());

        AgentRunResult result = orchestrator.run(request.getMessage(), context, agent);

        auditService.record(tenantId, userId, request.getMessage(), result);

        return AgentChatResponseDto.builder()
                .conversationId(result.conversationId())
                .message(result.finalText())
                .agent(result.agentName())
                .model(result.model())
                .status(result.status().name())
                .errorMessage(result.errorMessage())
                .toolsUsed(result.toolsUsed())
                .artifacts(result.artifacts())
                .iterations(result.iterations())
                .durationMs(result.durationMs())
                .usage(AgentChatResponseDto.Usage.builder()
                        .inputTokens(result.inputTokens())
                        .outputTokens(result.outputTokens())
                        .cacheReadTokens(result.cacheReadTokens())
                        .cacheCreationTokens(result.cacheCreationTokens())
                        .costMicroUsd(result.costMicroUsd())
                        .build())
                .build();
    }
}
