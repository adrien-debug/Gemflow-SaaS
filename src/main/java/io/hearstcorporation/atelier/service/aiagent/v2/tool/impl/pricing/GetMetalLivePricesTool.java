package io.hearstcorporation.atelier.service.aiagent.v2.tool.impl.pricing;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.hearstcorporation.atelier.dto.response.ExternalPriceDto;
import io.hearstcorporation.atelier.service.aiagent.ExternalPriceService;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.AgentTool;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.JsonSchema;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolContext;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolExecutionResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class GetMetalLivePricesTool implements AgentTool {

    private static final String NAME = "get_metal_live_prices";

    private static final String SCHEMA = """
            {
              "type": "object",
              "properties": {},
              "additionalProperties": false
            }
            """;

    private final ExternalPriceService externalPriceService;
    private final ObjectMapper mapper;

    @Override
    public String name() { return NAME; }

    @Override
    public ToolDefinition toolDefinition() {
        return ToolDefinition.of(
                NAME,
                "Fetch the current spot prices for precious metals (gold, silver, platinum, palladium). "
                        + "Returns price per ounce in USD, plus 24h change percentage and source. "
                        + "Use this whenever the metal cost is material to a pricing decision.",
                JsonSchema.parse(SCHEMA)
        );
    }

    @Override
    public ToolExecutionResult execute(JsonNode input, ToolContext context) {
        List<ExternalPriceDto> prices = externalPriceService.fetchAllMetalPrices();
        if (prices == null || prices.isEmpty()) {
            return ToolExecutionResult.error("No metal prices available right now");
        }

        ArrayNode arr = mapper.createArrayNode();
        for (ExternalPriceDto p : prices) {
            ObjectNode n = mapper.createObjectNode();
            n.put("metal", p.getMetal());
            n.put("unit", p.getUnit());
            n.put("price", p.getPrice());
            n.put("currency", p.getCurrency());
            n.put("change24hPercent", p.getChange24h());
            n.put("source", p.getSource());
            n.put("timestamp", p.getTimestamp() != null ? p.getTimestamp().toString() : null);
            arr.add(n);
        }

        ObjectNode out = mapper.createObjectNode();
        out.put("count", arr.size());
        out.set("prices", arr);
        return ToolExecutionResult.ok(out.toString());
    }
}
