package io.hearstcorporation.atelier.service.aiagent.v2.tool.impl.pricing;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.hearstcorporation.atelier.model.order.Order;
import io.hearstcorporation.atelier.model.order.OrderProfit;
import io.hearstcorporation.atelier.model.order.stock.OrderStock;
import io.hearstcorporation.atelier.repository.order.OrderProfitRepository;
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

import java.math.BigDecimal;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetOrderCostBreakdownTool implements AgentTool {

    private static final String NAME = "get_order_cost_breakdown";

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
    private final OrderProfitRepository orderProfitRepository;
    private final ObjectMapper mapper;

    @Override
    public String name() { return NAME; }

    @Override
    public ToolDefinition toolDefinition() {
        return ToolDefinition.of(
                NAME,
                "Return the full cost breakdown of a production order : raw cost of metals, "
                        + "gemstones, diamonds and labour (taken from order_stock aggregates) "
                        + "plus the markup percentages stored on the order (metal/labour/diamond/gemstone). "
                        + "All monetary values are in the order's accounting currency.",
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

        Optional<Order> maybeOrder = orderRepository.findOrderById(orderId);
        if (maybeOrder.isEmpty()) {
            return ToolExecutionResult.error("Order #" + orderId + " not found");
        }
        Order order = maybeOrder.get();
        OrderStock stock = order.getOrderStock();

        ObjectNode out = mapper.createObjectNode();
        out.put("orderId", order.getId());
        out.put("orderName", order.getName());
        out.put("status", order.getStatus() != null ? order.getStatus().name() : null);
        out.put("itemCategory", order.getItemCategory() != null ? order.getItemCategory().getName() : null);
        out.put("collection", order.getCollection() != null ? order.getCollection().getName() : null);
        out.put("segment", order.getSegment() != null ? order.getSegment().getName() : null);
        out.put("clientName", order.getClient() != null ? order.getClient().getName() : null);
        out.put("labourHourlyRate", order.getLabourHourlyRate());

        ObjectNode costs = mapper.createObjectNode();
        if (stock != null) {
            costs.put("metalsTotalCost", stock.getMetalsTotalCost());
            costs.put("metalsTotalWeightInGrams", stock.getMetalsTotalWeightIn());
            costs.put("metalsTotalWeightOutGrams", stock.getMetalsTotalWeightOut());

            costs.put("diamondsTotalCost", stock.getDiamondsTotalCost());
            costs.put("diamondsTotalMarkupCost", stock.getDiamondsTotalMarkupCost());
            costs.put("diamondsTotalQuantity", stock.getDiamondsTotalQuantity());
            costs.put("diamondsTotalWeightCarats", stock.getDiamondsTotalWeight());

            costs.put("gemstonesTotalCost", stock.getGemstonesTotalCost());
            costs.put("gemstonesTotalWeightCarats", stock.getGemstonesTotalWeight());

            costs.put("labourTotalCost", stock.getLabourTotalCost());
            costs.put("labourTotalMinutes", stock.getLabourTotalMinutes());

            costs.put("rawTotalCost", stock.getTotalCost());
            costs.put("stockStatus", stock.getStatus() != null ? stock.getStatus().name() : null);
            costs.put("saleDate", stock.getSaleDate() != null ? stock.getSaleDate().toString() : null);
        } else {
            costs.put("note", "No order_stock aggregate found for this order yet — costs not consolidated");
        }
        out.set("costs", costs);

        ObjectNode markups = mapper.createObjectNode();
        Optional<OrderProfit> maybeProfit = orderProfitRepository.findByOrderId(orderId);
        if (maybeProfit.isPresent()) {
            OrderProfit p = maybeProfit.get();
            markups.put("metalProfitPercent", p.getMetalProfitPercentage());
            markups.put("labourProfitPercent", p.getLabourProfitPercentage());
            markups.put("diamondProfitPercent", p.getDiamondProfitPercentage());
            markups.put("gemstoneProfitPercent", p.getGemstoneProfitPercentage());
            boolean allZero = isZero(p.getMetalProfitPercentage())
                    && isZero(p.getLabourProfitPercentage())
                    && isZero(p.getDiamondProfitPercentage())
                    && isZero(p.getGemstoneProfitPercentage());
            markups.put("allZero", allZero);
        } else {
            markups.put("note", "No OrderProfit row exists — no markup policy set yet");
        }
        out.set("markups", markups);

        if (stock != null) {
            BigDecimal sellingPrice = computeSellingPrice(stock, maybeProfit.orElse(null));
            if (sellingPrice != null) {
                out.put("indicativeSellingPriceFromCurrentMarkup", sellingPrice);
            }
        }

        return ToolExecutionResult.ok(out.toString());
    }

    private boolean isZero(Short v) {
        return v == null || v == 0;
    }

    /**
     * Sum the four cost categories, each multiplied by (1 + markup%).
     * Returns null when any required figure is missing.
     */
    private BigDecimal computeSellingPrice(OrderStock stock, OrderProfit profit) {
        if (stock == null) return null;
        BigDecimal total = BigDecimal.ZERO;
        total = addCategory(total, stock.getMetalsTotalCost(), profit != null ? profit.getMetalProfitPercentage() : null);
        total = addCategory(total, stock.getLabourTotalCost(), profit != null ? profit.getLabourProfitPercentage() : null);
        total = addCategory(total, stock.getDiamondsTotalCost(), profit != null ? profit.getDiamondProfitPercentage() : null);
        total = addCategory(total, stock.getGemstonesTotalCost(), profit != null ? profit.getGemstoneProfitPercentage() : null);
        return total.signum() == 0 ? null : total;
    }

    private BigDecimal addCategory(BigDecimal acc, BigDecimal cost, Short markupPercent) {
        if (cost == null) return acc;
        BigDecimal multiplier = BigDecimal.ONE;
        if (markupPercent != null && markupPercent != 0) {
            multiplier = BigDecimal.ONE.add(BigDecimal.valueOf(markupPercent).movePointLeft(2));
        }
        return acc.add(cost.multiply(multiplier));
    }
}
