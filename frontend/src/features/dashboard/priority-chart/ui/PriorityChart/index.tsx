import { FC, useMemo } from "react";
import { PriorityCount } from "@entities/dashboard";
import { MaisonCard } from "@features/agents/maison";
import "./styles.scss";

interface Props {
  ordersByPriority?: PriorityCount[];
  loading?: boolean;
}

interface Bucket {
  key: "HIGH" | "MEDIUM" | "LOW";
  label: string;
  count: number;
  cssVar: string;
}

const ORDERED: Array<Pick<Bucket, "key" | "label" | "cssVar">> = [
  { key: "HIGH", label: "Haute", cssVar: "var(--m-danger, #8E2E20)" },
  { key: "MEDIUM", label: "Moyenne", cssVar: "var(--m-warning, #A6741F)" },
  { key: "LOW", label: "Basse", cssVar: "var(--m-info, #324863)" },
];

const PriorityChart: FC<Props> = ({ ordersByPriority, loading }) => {
  const buckets = useMemo<Bucket[]>(() => {
    const map = new Map<string, number>();
    (ordersByPriority ?? []).forEach((p) => {
      map.set(p.priority.toUpperCase(), p.count);
    });
    return ORDERED.map((o) => ({ ...o, count: map.get(o.key) ?? 0 }));
  }, [ordersByPriority]);

  const total = buckets.reduce((sum, b) => sum + b.count, 0);

  if (!loading && total === 0) {
    return null;
  }

  return (
    <MaisonCard
      eyebrow="Priorités"
      title="Répartition par"
      emphasized="urgence"
      density="tight"
      loading={loading}
    >
      <div className="gf-priority">
        <div className="gf-priority__bar" role="img" aria-label="Distribution des priorités">
          {buckets.map((b) => {
            const pct = total > 0 ? (b.count / total) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={b.key}
                className="gf-priority__seg"
                style={{ width: `${pct}%`, background: b.cssVar }}
                title={`${b.label} · ${b.count}`}
              />
            );
          })}
        </div>
        <ul className="gf-priority__legend">
          {buckets.map((b) => (
            <li key={b.key} className="gf-priority__legend-item">
              <span className="gf-priority__dot" style={{ background: b.cssVar }} aria-hidden />
              <span className="gf-priority__legend-label">{b.label}</span>
              <span className="gf-priority__legend-count">{b.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </MaisonCard>
  );
};

export default PriorityChart;
