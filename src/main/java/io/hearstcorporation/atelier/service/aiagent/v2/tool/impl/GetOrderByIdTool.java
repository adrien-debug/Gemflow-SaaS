package io.hearstcorporation.atelier.service.aiagent.v2.tool.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.repository.order.OrderRepository;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.AgentTool;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.JsonSchema;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolContext;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolExecutionResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetOrderByIdTool implements AgentTool {

    private static final String NAME = "get_order_by_id";

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

    private final OrderRepository orderRepository;
    private final ObjectMapper mapper;

    @Override
    public String name() { return NAME; }

    @Override
    public ToolDefinition toolDefinition() {
        return ToolDefinition.of(
                NAME,
                "Fetch a production order (jewelry piece) by numeric ID. "
                        + "Returns name, status, priority, due date, client name, category, "
                        + "collection, segment, and counts of materials and gemstones.",
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

        Optional<Order> maybe = orderRepository.findOrderById(orderId);
        if (maybe.isEmpty()) {
            return ToolExecutionResult.error("Order #" + orderId + " not found");
        }
        Order o = maybe.get();

        ObjectNode out = mapper.createObjectNode();
        out.put("id", o.getId());
        out.put("name", o.getName());
        out.put("status", o.getStatus() != null ? o.getStatus().name() : null);
        out.put("priority", o.getPriority() != null ? o.getPriority().name() : null);
        out.put("dueDate", o.getDueDate() != null ? o.getDueDate().toString() : null);
        out.put("acceptanceDate", o.getAcceptanceDate() != null ? o.getAcceptanceDate().toString() : null);
        out.put("description", o.getDescription());
        out.put("settingType", o.getSettingType() != null ? o.getSettingType().name() : null);
        out.put("clientName", o.getClient() != null ? o.getClient().getName() : null);
        out.put("itemCategoryName", o.getItemCategory() != null ? o.getItemCategory().getName() : null);
        out.put("collectionName", o.getCollection() != null ? o.getCollection().getName() : null);
        out.put("segmentName", o.getSegment() != null ? o.getSegment().getName() : null);
        out.put("materialsCount", o.getMaterials() != null ? o.getMaterials().size() : 0);
        out.put("gemstonesCount", o.getGemstones() != null ? o.getGemstones().size() : 0);
        out.put("createdAt", o.getCreatedAt() != null ? o.getCreatedAt().toString() : null);

        return ToolExecutionResult.ok(out.toString());
    }
}
