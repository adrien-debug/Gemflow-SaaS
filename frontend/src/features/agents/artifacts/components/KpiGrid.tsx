import { CSSProperties, FC } from "react";
import { KpiGridPayload } from "../types";
import MetricCard from "./MetricCard";

interface KpiGridProps {
  payload: KpiGridPayload;
}

const KpiGrid: FC<KpiGridProps> = ({ payload }) => {
  const items = payload.items ?? [];
  if (items.length === 0) return null;

  const cols = Math.min(items.length, 4);
  const style = { "--gf-kpi-cols": cols } as CSSProperties;

  return (
    <div className="gf-kpi-grid" style={style}>
      {items.map((item, idx) => (
        <MetricCard key={`${item.label}-${idx}`} payload={item} />
      ))}
    </div>
  );
};

export default KpiGrid;
