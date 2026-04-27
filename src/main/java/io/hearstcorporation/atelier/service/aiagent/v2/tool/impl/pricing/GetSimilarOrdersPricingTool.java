package io.hearstcorporation.atelier.service.aiagent.v2.tool.impl.pricing;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.AgentTool;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.JsonSchema;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolContext;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolExecutionResult;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Slf4j
@Component
public class GetSimilarOrdersPricingTool implements AgentTool {

    private static final String NAME = "get_similar_orders_pricing";

    private static final String SCHEMA = """
            {
              "type": "object",
              "properties": {
                "itemCategoryId": {
                  "type": "integer",
                  "description": "ID of the item category (e.g. ring, pendant, bracelet) — required"
                },
                "collectionId": {
                  "type": "integer",
                  "description": "Optional ID of the collection to narrow comparables"
                },
                "segmentId": {
                  "type": "integer",
                  "description": "Optional ID of the segment (price tier) to narrow comparables"
                },
                "lookbackMonths": {
                  "type": "integer",
                  "minimum": 1,
                  "maximum": 60,
                  "description": "Only consider orders created within the last N months (default 24)"
                }
              },
              "required": ["itemCategoryId"],
              "additionalProperties": false
            }
            """;

    @PersistenceContext
    private EntityManager em;

    private final ObjectMapper mapper;

    public GetSimilarOrdersPricingTool(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public String name() { return NAME; }

    @Override
    public ToolDefinition toolDefinition() {
        return ToolDefinition.of(
                NAME,
                "Compute pricing comparables for a new piece. Given an item category (and "
                        + "optionally a collection / segment / lookback window), aggregates the "
                        + "raw total cost of historical order_stock rows : count, average, median, min, "
                        + "max. Use this as the anchor before recommending a price.",
                JsonSchema.parse(SCHEMA)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ToolExecutionResult execute(JsonNode input, ToolContext context) {
        if (input == null || !input.has("itemCategoryId") || !input.get("itemCategoryId").canConvertToLong()) {
            return ToolExecutionResult.error("Missing or invalid 'itemCategoryId' (must be a positive integer)");
        }
        long itemCategoryId = input.get("itemCategoryId").asLong();
        Long collectionId = input.has("collectionId") && input.get("collectionId").canConvertToLong()
                ? input.get("collectionId").asLong() : null;
        Long segmentId = input.has("segmentId") && input.get("segmentId").canConvertToLong()
                ? input.get("segmentId").asLong() : null;
        int lookbackMonths = input.has("lookbackMonths") && input.get("lookbackMonths").isInt()
                ? Math.max(1, Math.min(60, input.get("lookbackMonths").asInt())) : 24;

        StringBuilder jpql = new StringBuilder("""
                SELECT s.totalCost
                FROM OrderStock s
                JOIN s.order o
                WHERE o.itemCategory.id = :categoryId
                  AND s.totalCost IS NOT NULL
                  AND s.totalCost > 0
                  AND o.createdAt >= :since
                """);
        if (collectionId != null) jpql.append(" AND o.collection.id = :collectionId");
        if (segmentId != null) jpql.append(" AND o.segment.id = :segmentId");
        jpql.append(" ORDER BY s.totalCost ASC");

        Query q = em.createQuery(jpql.toString());
        q.setParameter("categoryId", itemCategoryId);
        q.setParameter("since", java.time.Instant.now().minus(java.time.Duration.ofDays(30L * lookbackMonths)));
        if (collectionId != null) q.setParameter("collectionId", collectionId);
        if (segmentId != null) q.setParameter("segmentId", segmentId);

        @SuppressWarnings("unchecked")
        List<BigDecimal> values = q.getResultList();

        ObjectNode out = mapper.createObjectNode();
        out.put("itemCategoryId", itemCategoryId);
        if (collectionId != null) out.put("collectionId", collectionId);
        if (segmentId != null) out.put("segmentId", segmentId);
        out.put("lookbackMonths", lookbackMonths);
        out.put("matchCount", values.size());

        if (values.isEmpty()) {
            out.put("note", "No comparable orders found in the requested window");
            return ToolExecutionResult.ok(out.toString());
        }

        BigDecimal sum = BigDecimal.ZERO;
        for (BigDecimal v : values) sum = sum.add(v);
        BigDecimal avg = sum.divide(BigDecimal.valueOf(values.size()), 2, RoundingMode.HALF_UP);
        BigDecimal min = values.get(0);
        BigDecimal max = values.get(values.size() - 1);
        BigDecimal median = values.size() % 2 == 1
                ? values.get(values.size() / 2)
                : values.get(values.size() / 2 - 1).add(values.get(values.size() / 2))
                        .divide(BigDecimal.valueOf(2), 2, RoundingMode.HALF_UP);

        ObjectNode stats = mapper.createObjectNode();
        stats.put("min", min);
        stats.put("max", max);
        stats.put("average", avg);
        stats.put("median", median);
        out.set("stats", stats);
        return ToolExecutionResult.ok(out.toString());
    }
}
