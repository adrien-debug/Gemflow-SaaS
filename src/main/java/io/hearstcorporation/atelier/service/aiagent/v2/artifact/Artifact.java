package io.hearstcorporation.atelier.service.aiagent.v2.artifact;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;

/**
 * Structured visual artifact emitted by an agent during a run.
 * Front-end dispatches on {@link #type()} and renders accordingly.
 *
 * <p>Stable types (whitelist enforced server-side) :
 * <ul>
 *   <li>{@code metric_card}        — single KPI</li>
 *   <li>{@code kpi_grid}           — grid of KPIs</li>
 *   <li>{@code table}              — tabular data</li>
 *   <li>{@code price_recommendation} — pricing range with drivers / risks / sources</li>
 *   <li>{@code cost_breakdown}     — costs per category with percentages</li>
 *   <li>{@code callout}            — info / warning / critical note</li>
 * </ul>
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Artifact(String type, String title, JsonNode payload) {}
