package io.hearstcorporation.atelier.service.aiagent.v2.tool;

import io.hearstcorporation.atelier.service.aiagent.v2.api.ContentBlock;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Component
public class ToolRegistry {

    private final Map<String, AgentTool> toolsByName = new HashMap<>();
    private final List<AgentTool> allTools;

    public ToolRegistry(List<AgentTool> allTools) {
        this.allTools = allTools;
    }

    @PostConstruct
    void index() {
        for (AgentTool tool : allTools) {
            String name = tool.name();
            if (toolsByName.containsKey(name)) {
                throw new IllegalStateException("Duplicate AgentTool name: " + name);
            }
            toolsByName.put(name, tool);
        }
        log.info("ToolRegistry indexed {} agent tool(s): {}", toolsByName.size(), toolsByName.keySet());
    }

    public Optional<AgentTool> find(String name) {
        return Optional.ofNullable(toolsByName.get(name));
    }

    /**
     * Build the tool definitions to send to the LLM, optionally restricted to a subset.
     * The last tool is marked with cache_control to enable prompt caching of the tool list.
     *
     * @param allowedToolNames {@code null} = all tools ; otherwise only names in the set are exposed
     * @param enableCaching    add ephemeral cache_control on the last tool
     */
    public List<ToolDefinition> definitionsForLlm(Set<String> allowedToolNames, boolean enableCaching) {
        List<ToolDefinition> defs = allTools.stream()
                .filter(t -> allowedToolNames == null || allowedToolNames.contains(t.name()))
                .map(AgentTool::toolDefinition)
                .toList();

        if (!enableCaching || defs.isEmpty()) {
            return defs;
        }

        List<ToolDefinition> mutable = new java.util.ArrayList<>(defs);
        int last = mutable.size() - 1;
        mutable.set(last, mutable.get(last).withCacheControl(ContentBlock.CacheControl.ephemeral()));
        return List.copyOf(mutable);
    }

    public List<ToolDefinition> definitionsForLlm(boolean enableCaching) {
        return definitionsForLlm(null, enableCaching);
    }

    public int size() {
        return toolsByName.size();
    }
}
