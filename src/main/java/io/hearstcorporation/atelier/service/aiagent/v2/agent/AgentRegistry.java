package io.hearstcorporation.atelier.service.aiagent.v2.agent;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Component
public class AgentRegistry {

    public static final String DEFAULT_AGENT_NAME = "default";

    private final Map<String, AgentDefinition> byName = new HashMap<>();
    private final List<AgentDefinition> all;

    public AgentRegistry(List<AgentDefinition> all) {
        this.all = all;
    }

    @PostConstruct
    void index() {
        for (AgentDefinition def : all) {
            String name = def.name();
            if (name == null || name.isBlank()) {
                throw new IllegalStateException("AgentDefinition with blank name: " + def.getClass());
            }
            if (byName.containsKey(name)) {
                throw new IllegalStateException("Duplicate AgentDefinition name: " + name);
            }
            byName.put(name, def);
        }
        if (!byName.containsKey(DEFAULT_AGENT_NAME)) {
            throw new IllegalStateException("No '" + DEFAULT_AGENT_NAME + "' AgentDefinition registered");
        }
        log.info("AgentRegistry indexed {} agent(s): {}", byName.size(), byName.keySet());
    }

    public AgentDefinition resolve(String requestedName) {
        if (requestedName == null || requestedName.isBlank()) {
            return byName.get(DEFAULT_AGENT_NAME);
        }
        return Optional.ofNullable(byName.get(requestedName.toLowerCase()))
                .orElseGet(() -> byName.get(DEFAULT_AGENT_NAME));
    }

    public boolean exists(String name) {
        return name != null && byName.containsKey(name.toLowerCase());
    }
}
