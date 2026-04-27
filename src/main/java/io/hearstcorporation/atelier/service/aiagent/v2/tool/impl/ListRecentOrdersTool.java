package io.hearstcorporation.atelier.service.aiagent.v2.tool.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderStatus;
import io.hearstcorporation.atelier.repository.order.OrderRepository;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.AgentTool;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.JsonSchema;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolContext;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolExecutionResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class ListRecentOrdersTool implements AgentTool {

    private static final String NAME = "list_recent_orders";

    private static final int DEFAULT_LIMIT = 10;
    private static final int MAX_LIMIT = 50;

    private static final String SCHEMA = """
            {
              "type": "object",
              "properties": {
                "limit": {
                  "type": "integer",
                  "minimum": 1,
                  "maximum": 50,
                  "description": "Number of orders to return (default 10, max 50)"
                },
                "status": {
                  "type": "string",
                  "description": "Optional OrderStatus enum value (e.g. IN_CAD, AT_THE_CASTING, FINISHED)"
                }
              },
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
                "List the most recently created production orders, optionally filtered by status. "
                        + "Returns a compact array of order summaries (id, name, status, due date, client).",
                JsonSchema.parse(SCHEMA)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ToolExecutionResult execute(JsonNode input, ToolContext context) {
        int limit = DEFAULT_LIMIT;
        if (input != null && input.has("limit") && input.get("limit").isInt()) {
            limit = Math.max(1, Math.min(MAX_LIMIT, input.get("limit").asInt()));
        }

        OrderStatus status = null;
        if (input != null && input.has("status") && !input.get("status").isNull()) {
            String raw = input.get("status").asText();
            try {
                status = OrderStatus.valueOf(raw);
            } catch (IllegalArgumentException e) {
                return ToolExecutionResult.error(
                        "Unknown status '" + raw + "'. Valid values include: "
                                + java.util.Arrays.stream(OrderStatus.values())
                                        .map(Enum::name).limit(10).toList() + " ...");
            }
        }

        final OrderStatus filterStatus = status;
        Specification<Order> spec = (root, query, cb) ->
                filterStatus == null ? cb.conjunction() : cb.equal(root.get("status"), filterStatus);

        PageRequest pageRequest = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Order> page = orderRepository.findAll(spec, pageRequest);

        ArrayNode arr = mapper.createArrayNode();
        for (Order o : page.getContent()) {
            ObjectNode n = mapper.createObjectNode();
            n.put("id", o.getId());
            n.put("name", o.getName());
            n.put("status", o.getStatus() != null ? o.getStatus().name() : null);
            n.put("priority", o.getPriority() != null ? o.getPriority().name() : null);
            n.put("dueDate", o.getDueDate() != null ? o.getDueDate().toString() : null);
            n.put("clientName", o.getClient() != null ? o.getClient().getName() : null);
            n.put("createdAt", o.getCreatedAt() != null ? o.getCreatedAt().toString() : null);
            arr.add(n);
        }

        ObjectNode out = mapper.createObjectNode();
        out.put("totalReturned", arr.size());
        out.put("totalMatching", page.getTotalElements());
        out.put("filterStatus", filterStatus != null ? filterStatus.name() : null);
        out.set("orders", arr);

        return ToolExecutionResult.ok(out.toString());
    }
}
