package io.hearstcorporation.atelier.service.aiagent.v2.artifact;

import java.util.Set;

public final class ArtifactTypes {

    public static final String METRIC_CARD = "metric_card";
    public static final String KPI_GRID = "kpi_grid";
    public static final String TABLE = "table";
    public static final String PRICE_RECOMMENDATION = "price_recommendation";
    public static final String COST_BREAKDOWN = "cost_breakdown";
    public static final String CALLOUT = "callout";

    public static final Set<String> ALL = Set.of(
            METRIC_CARD,
            KPI_GRID,
            TABLE,
            PRICE_RECOMMENDATION,
            COST_BREAKDOWN,
            CALLOUT
    );

    private ArtifactTypes() {}
}
