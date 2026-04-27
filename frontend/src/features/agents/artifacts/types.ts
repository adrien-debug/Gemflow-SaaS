export type ArtifactType =
  | "metric_card"
  | "kpi_grid"
  | "table"
  | "price_recommendation"
  | "cost_breakdown"
  | "callout";

export interface MetricCardPayload {
  value: string | number;
  label: string;
  unit?: string | null;
  deltaPercent?: number | null;
  sublabel?: string | null;
}

export interface KpiGridPayload {
  items: MetricCardPayload[];
}

export type TableCellValue = string | number | null;

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
}

export interface TablePayload {
  columns: TableColumn[];
  rows: Array<Record<string, TableCellValue>>;
  footer?: Record<string, TableCellValue> | null;
}

export interface PriceRecommendationPayload {
  currency: string;
  low: number;
  mid: number;
  high: number;
  impliedMarginPercent: number;
  drivers: string[];
  risks: string[];
  sources: string[];
}

export interface CostBreakdownItem {
  category: string;
  amount: number;
  percentOfTotal: number;
}

export interface CostBreakdownPayload {
  currency: string;
  total: number;
  items: CostBreakdownItem[];
  sources: string[];
}

export type CalloutLevel = "info" | "warning" | "critical";

export interface CalloutPayload {
  level: CalloutLevel;
  title: string;
  body: string;
}

export type ArtifactPayload =
  | MetricCardPayload
  | KpiGridPayload
  | TablePayload
  | PriceRecommendationPayload
  | CostBreakdownPayload
  | CalloutPayload;

export interface Artifact {
  type: ArtifactType;
  title: string | null;
  payload: ArtifactPayload;
}

export type AgentChatStatus = "SUCCESS" | "ERROR" | "MAX_ITERATIONS";

export interface AgentChatUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  costMicroUsd: number;
}

export interface AgentChatResponse {
  conversationId: string;
  agent: string;
  model: string;
  status: AgentChatStatus;
  errorMessage: string | null;
  message: string | null;
  toolsUsed: string[];
  artifacts: Artifact[];
  iterations: number;
  durationMs: number;
  usage: AgentChatUsage;
}

export interface TypedArtifact<T extends ArtifactType, P extends ArtifactPayload> {
  type: T;
  title: string | null;
  payload: P;
}

export type MetricCardArtifact = TypedArtifact<"metric_card", MetricCardPayload>;
export type KpiGridArtifact = TypedArtifact<"kpi_grid", KpiGridPayload>;
export type TableArtifact = TypedArtifact<"table", TablePayload>;
export type PriceRecommendationArtifact = TypedArtifact<"price_recommendation", PriceRecommendationPayload>;
export type CostBreakdownArtifact = TypedArtifact<"cost_breakdown", CostBreakdownPayload>;
export type CalloutArtifact = TypedArtifact<"callout", CalloutPayload>;
