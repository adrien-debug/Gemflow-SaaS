import { FC } from "react";
import {
  Artifact,
  CalloutPayload,
  CostBreakdownPayload,
  KpiGridPayload,
  MetricCardPayload,
  PriceRecommendationPayload,
  TablePayload,
} from "../types";
import MetricCard from "./MetricCard";
import KpiGrid from "./KpiGrid";
import ArtifactTable from "./ArtifactTable";
import PriceRecommendation from "./PriceRecommendation";
import CostBreakdown from "./CostBreakdown";
import Callout from "./Callout";

interface ArtifactRendererProps {
  artifact: Artifact;
}

const ArtifactRenderer: FC<ArtifactRendererProps> = ({ artifact }) => {
  switch (artifact.type) {
    case "metric_card": {
      const node = (
        <MetricCard payload={artifact.payload as MetricCardPayload} />
      );
      return artifact.title ? (
        <div>
          <p className="gf-artifacts__title">{artifact.title}</p>
          {node}
        </div>
      ) : (
        node
      );
    }
    case "kpi_grid": {
      const node = <KpiGrid payload={artifact.payload as KpiGridPayload} />;
      return artifact.title ? (
        <div>
          <p className="gf-artifacts__title">{artifact.title}</p>
          {node}
        </div>
      ) : (
        node
      );
    }
    case "table":
      return (
        <ArtifactTable
          title={artifact.title}
          payload={artifact.payload as TablePayload}
        />
      );
    case "price_recommendation":
      return (
        <PriceRecommendation
          title={artifact.title}
          payload={artifact.payload as PriceRecommendationPayload}
        />
      );
    case "cost_breakdown":
      return (
        <CostBreakdown
          title={artifact.title}
          payload={artifact.payload as CostBreakdownPayload}
        />
      );
    case "callout":
      return <Callout payload={artifact.payload as CalloutPayload} />;
    default:
      return null;
  }
};

export default ArtifactRenderer;
