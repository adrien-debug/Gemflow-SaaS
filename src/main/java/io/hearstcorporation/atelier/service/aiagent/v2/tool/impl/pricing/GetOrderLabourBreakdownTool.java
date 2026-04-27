package io.hearstcorporation.atelier.service.aiagent.v2.tool.impl.pricing;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.hearstcorporation.atelier.model.order.labour.OrderLabourTaskTypeSummary;
import io.hearstcorporation.atelier.repository.order.labour.OrderLabourRepository;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.AgentTool;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.JsonSchema;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolContext;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolExecutionResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetOrderLabourBreakdownTool implements AgentTool {

    private static final String NAME = "get_order_labour_breakdown";

    private static final String SCHEMA = """
            {
              "type": "object",
              "properties": {
                "orderId": {
                  "type": "integer",
                  "description": "Numeric ID of the production order"
                }
              },
              "required": ["orderId"],
              "additionalProperties": false
            }
            """;

    private final OrderLabourRepository orderLabourRepository;
    private final ObjectMapper mapper;

    @Override
    public String name() { return NAME; }

    @Override
    public ToolDefinition toolDefinition() {
        return ToolDefinition.of(
                NAME,
                "Return time spent on a production order, grouped by labour task type "
                        + "(CAD, prototyping, casting, mounting, setting, polishing, gravure, QC, ...). "
                        + "Time is returned both in seconds and minutes. Useful to spot tasks that "
                        + "ate a disproportionate share of labour cost.",
                JsonSchema.parse(SCHEMA)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ToolExecutionResult execute(JsonNode input, ToolContext context) {
        if (input == null || !input.has("orderId") || !input.get("orderId").canConvertToLong()) {
            return ToolExecutionResult.error("Missing or invalid 'orderId' (must be a positive integer)");
        }
        long orderId = input.get("orderId").asLong();

        List<OrderLabourTaskTypeSummary> rows = orderLabourRepository.getOrderLabourTaskTypeSummary(orderId);

        if (rows == null || rows.isEmpty()) {
            ObjectNode empty = mapper.createObjectNode();
            empty.put("orderId", orderId);
            empty.put("totalSeconds", 0);
            empty.put("note", "No labour entries logged for this order yet");
            empty.set("byTaskType", mapper.createArrayNode());
            return ToolExecutionResult.ok(empty.toString());
        }

        long totalSeconds = 0L;
        ArrayNode arr = mapper.createArrayNode();
        for (OrderLabourTaskTypeSummary row : rows) {
            ObjectNode n = mapper.createObjectNode();
            n.put("taskType", row.getTaskType() != null ? row.getTaskType().name() : null);
            long seconds = row.getTotalTimeSpent() != null ? row.getTotalTimeSpent() : 0L;
            n.put("seconds", seconds);
            n.put("minutes", seconds / 60.0);
            n.put("hours", seconds / 3600.0);
            arr.add(n);
            totalSeconds += seconds;
        }

        ObjectNode out = mapper.createObjectNode();
        out.put("orderId", orderId);
        out.put("totalSeconds", totalSeconds);
        out.put("totalHours", totalSeconds / 3600.0);
        out.set("byTaskType", arr);
        return ToolExecutionResult.ok(out.toString());
    }
}
