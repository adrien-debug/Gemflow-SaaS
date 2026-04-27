package io.hearstcorporation.atelier.service.aiagent.v2.tool.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.hearstcorporation.atelier.service.aiagent.v2.api.ToolDefinition;
import io.hearstcorporation.atelier.service.aiagent.v2.artifact.Artifact;
import io.hearstcorporation.atelier.service.aiagent.v2.artifact.ArtifactTypes;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.AgentTool;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.JsonSchema;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolContext;
import io.hearstcorporation.atelier.service.aiagent.v2.tool.ToolExecutionResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmitArtifactTool implements AgentTool {

    private static final String NAME = "emit_artifact";

    private static final String DESCRIPTION = """
            Emit a structured visual artifact alongside the textual reply. The host application
            renders these as cards, tables and recommendation panels. Use one or more artifacts
            whenever the answer contains numbers, comparisons, recommendations or tabular data.

            Allowed types and the shape of `payload` :

            - metric_card        : { value: string|number, label: string, unit?: string,
                                     deltaPercent?: number, sublabel?: string }
            - kpi_grid           : { items: metric_card_payload[] }
            - table              : { columns: [{ key: string, label: string, align?: "left"|"right"|"center" }],
                                     rows: object[],   // each row keyed by column.key
                                     footer?: object }
            - price_recommendation : { currency: string, low: number, mid: number, high: number,
                                       impliedMarginPercent: number,
                                       drivers: string[], risks: string[], sources: string[] }
            - cost_breakdown     : { currency: string,
                                     items: [{ category: string, amount: number, percentOfTotal: number }],
                                     total: number, sources: string[] }
            - callout            : { level: "info"|"warning"|"critical", title: string, body: string }

            Rules :
            - Every figure must be sourced (mention which tool or table the number came from).
            - Use the order's currency or USD if unknown ; never silently convert.
            - Do not embed emojis or decorative characters in titles or payload values.
            """;

    private static final String SCHEMA = """
            {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string",
                  "enum": ["metric_card", "kpi_grid", "table", "price_recommendation", "cost_breakdown", "callout"]
                },
                "title": {
                  "type": "string",
                  "description": "Short headline rendered above the artifact (max 80 chars, no emoji)"
                },
                "payload": {
                  "type": "object",
                  "description": "Type-specific structure, see tool description"
                }
              },
              "required": ["type", "payload"],
              "additionalProperties": false
            }
            """;

    private final ObjectMapper mapper;

    @Override
    public String name() { return NAME; }

    @Override
    public ToolDefinition toolDefinition() {
        return ToolDefinition.of(NAME, DESCRIPTION, JsonSchema.parse(SCHEMA));
    }

    @Override
    public ToolExecutionResult execute(JsonNode input, ToolContext context) {
        if (input == null || !input.has("type") || !input.has("payload")) {
            return ToolExecutionResult.error("Missing 'type' or 'payload'");
        }
        String type = input.get("type").asText();
        if (!ArtifactTypes.ALL.contains(type)) {
            return ToolExecutionResult.error(
                    "Unknown artifact type '" + type + "'. Allowed: " + ArtifactTypes.ALL);
        }

        String title = input.has("title") && !input.get("title").isNull()
                ? input.get("title").asText() : null;
        if (title != null && title.length() > 200) {
            title = title.substring(0, 200);
        }

        JsonNode payload = input.get("payload");
        if (!payload.isObject()) {
            return ToolExecutionResult.error("'payload' must be a JSON object");
        }

        if (context.runState() == null) {
            return ToolExecutionResult.error("Run state unavailable — artifact dropped");
        }

        boolean accepted = context.runState().addArtifact(new Artifact(type, title, payload));
        if (!accepted) {
            return ToolExecutionResult.error("Artifact buffer full (max 32 per run)");
        }

        ObjectNode out = mapper.createObjectNode();
        out.put("ok", true);
        out.put("type", type);
        out.put("totalArtifacts", context.runState().artifactCount());
        return ToolExecutionResult.ok(out.toString());
    }
}
