package io.hearstcorporation.atelier.service.aiagent.v2.orchestrator;

import io.hearstcorporation.atelier.service.aiagent.v2.agent.AgentDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.api.AnthropicMessage;
import io.hearstcorporation.atelier.service.aiagent.v2.api.AnthropicMessageRequest;
import io.hearstcorporation.atelier.service.aiagent.v2.api.AnthropicMessageResponse;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ContentBlock;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.client.AnthropicClient;
import io.hearstcorporation.atelier.service.aiagent.v2.config.AnthropicProperties;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.AgentTool;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolContext;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolExecutionResult;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolRegistry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Orchestrates one agent turn :
 *   1. seed the conversation with the agent's system prompt + the user message,
 *   2. loop : call LLM → run any requested tools → feed results back → repeat,
 *   3. stop on stop_reason != "tool_use" or when max iterations is reached.
 *
 * Tools never see tenant/user info from the LLM — those are injected here from
 * the {@link ToolContext} the controller built from the authenticated request.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AgentOrchestrator {

    private final AnthropicClient anthropicClient;
    private final ToolRegistry toolRegistry;
    private final AnthropicProperties props;

    public AgentRunResult run(String userMessage, ToolContext context, AgentDefinition agent) {
        long started = System.currentTimeMillis();

        String model = agent.preferredModel() != null ? agent.preferredModel() : props.getDefaultModel();
        List<ContentBlock> system = buildSystemBlocks(agent.systemPrompt());
        List<ToolDefinition> tools = toolRegistry.definitionsForLlm(
                agent.allowedToolNames(), props.isEnablePromptCaching());
        List<AnthropicMessage> messages = new ArrayList<>();
        messages.add(AnthropicMessage.user(userMessage));

        List<String> toolsUsed = new ArrayList<>();
        int totalInput = 0, totalOutput = 0, totalCacheRead = 0, totalCacheCreate = 0;
        long totalCost = 0L;
        String finalText = null;
        AgentRunResult.Status status = AgentRunResult.Status.SUCCESS;
        String errorMessage = null;

        try {
            for (int iter = 1; iter <= props.getMaxToolIterations(); iter++) {
                AnthropicMessageRequest req = new AnthropicMessageRequest(
                        model, props.getMaxTokens(), system, messages, tools, null);

                AnthropicMessageResponse resp = anthropicClient.createMessage(req);

                if (resp != null && resp.usage() != null) {
                    totalInput += resp.usage().inputTokens();
                    totalOutput += resp.usage().outputTokens();
                    totalCacheRead += resp.usage().cacheRead();
                    totalCacheCreate += resp.usage().cacheCreation();
                    totalCost += ModelPricing.costMicroUsd(
                            resp.model() != null ? resp.model() : model,
                            resp.usage().inputTokens(),
                            resp.usage().outputTokens(),
                            resp.usage().cacheRead(),
                            resp.usage().cacheCreation());
                }

                if (resp == null || resp.content() == null) {
                    errorMessage = "Empty response from LLM";
                    status = AgentRunResult.Status.ERROR;
                    break;
                }

                StringBuilder textBuf = new StringBuilder();
                for (ContentBlock block : resp.content()) {
                    if (block.isText() && block.text() != null) {
                        if (textBuf.length() > 0) textBuf.append("\n");
                        textBuf.append(block.text());
                    }
                }
                if (textBuf.length() > 0) {
                    finalText = textBuf.toString();
                }

                if (!resp.wantsTool()) {
                    return new AgentRunResult(
                            context.conversationId(), agent.name(), model,
                            finalText,
                            context.runState() != null ? context.runState().artifacts() : java.util.List.of(),
                            toolsUsed, iter,
                            totalInput, totalOutput, totalCacheRead, totalCacheCreate,
                            totalCost, System.currentTimeMillis() - started,
                            status, errorMessage);
                }

                messages.add(new AnthropicMessage("assistant", resp.content()));

                List<ContentBlock> toolResults = new ArrayList<>();
                for (ContentBlock block : resp.content()) {
                    if (!block.isToolUse()) continue;

                    String toolName = block.name();
                    toolsUsed.add(toolName);

                    Optional<AgentTool> maybe = toolRegistry.find(toolName);
                    if (maybe.isEmpty()
                            || (agent.allowedToolNames() != null && !agent.allowedToolNames().contains(toolName))) {
                        log.warn("Agent '{}' requested forbidden or unknown tool '{}'", agent.name(), toolName);
                        toolResults.add(ContentBlock.toolResult(block.id(),
                                "Tool '" + toolName + "' is not available for this agent.", true));
                        continue;
                    }

                    ToolExecutionResult execResult;
                    long t0 = System.currentTimeMillis();
                    try {
                        execResult = maybe.get().execute(block.input(), context);
                    } catch (RuntimeException ex) {
                        log.warn("Tool '{}' threw", toolName, ex);
                        execResult = ToolExecutionResult.error("Tool failed: " + ex.getMessage());
                    }
                    log.debug("agent={} tool={} duration_ms={} error={}", agent.name(), toolName,
                            System.currentTimeMillis() - t0, execResult.isError());

                    toolResults.add(ContentBlock.toolResult(block.id(), execResult.content(), execResult.isError()));
                }

                messages.add(AnthropicMessage.userToolResults(toolResults));
            }

            status = AgentRunResult.Status.MAX_ITERATIONS;
            errorMessage = "Reached max tool iterations (" + props.getMaxToolIterations() + ")";

        } catch (RuntimeException ex) {
            log.error("Agent run failed", ex);
            status = AgentRunResult.Status.ERROR;
            errorMessage = ex.getMessage();
        }

        return new AgentRunResult(
                context.conversationId(), agent.name(), model,
                finalText,
                context.runState() != null ? context.runState().artifacts() : java.util.List.of(),
                toolsUsed, props.getMaxToolIterations(),
                totalInput, totalOutput, totalCacheRead, totalCacheCreate,
                totalCost, System.currentTimeMillis() - started,
                status, errorMessage);
    }

    private List<ContentBlock> buildSystemBlocks(String systemPrompt) {
        ContentBlock block = props.isEnablePromptCaching()
                ? new ContentBlock("text", systemPrompt, null, null, null, null, null, null,
                        ContentBlock.CacheControl.ephemeral())
                : ContentBlock.text(systemPrompt);
        return List.of(block);
    }
}
