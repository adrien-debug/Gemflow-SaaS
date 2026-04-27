package io.hearstcorporation.atelier.service.aiagent.v2.tool.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.hearstcorporation.atelier.model.order.OrderStatus;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.AgentTool;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.JsonSchema;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolContext;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolExecutionResult;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
public class CountOrdersByStatusTool implements AgentTool {

    private static final String NAME = "count_orders_by_status";

    private static final String SCHEMA = """
            {
              "type": "object",
              "properties": {},
              "additionalProperties": false
            }
            """;

    @PersistenceContext
    private EntityManager entityManager;

    private final ObjectMapper mapper;

    public CountOrdersByStatusTool(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public String name() { return NAME; }

    @Override
    public ToolDefinition toolDefinition() {
        return ToolDefinition.of(
                NAME,
                "Return a breakdown of all production orders grouped by their workflow status "
                        + "(IN_CAD, AT_THE_CASTING, IN_SETTING, FINISHED, …). "
                        + "Returns total count and a map of status → count.",
                JsonSchema.parse(SCHEMA)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ToolExecutionResult execute(JsonNode input, ToolContext context) {
        @SuppressWarnings("unchecked")
        List<Object[]> rows = entityManager.createQuery(
                        "SELECT o.status, COUNT(o) FROM Order o GROUP BY o.status")
                .getResultList();

        ObjectNode counts = mapper.createObjectNode();
        long total = 0L;
        for (Object[] row : rows) {
            OrderStatus status = (OrderStatus) row[0];
            Long count = (Long) row[1];
            counts.put(status.name(), count);
            total += count;
        }

        ObjectNode out = mapper.createObjectNode();
        out.put("totalOrders", total);
        out.set("byStatus", counts);
        return ToolExecutionResult.ok(out.toString());
    }
}
