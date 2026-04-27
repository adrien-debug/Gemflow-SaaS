import { FC } from "react";
import { CostBreakdownPayload } from "../types";
import { useArtifactNumberFormat } from "../hooks/useArtifactNumberFormat";

interface CostBreakdownProps {
  title?: string | null;
  payload: CostBreakdownPayload;
}

const CostBreakdown: FC<CostBreakdownProps> = ({ title, payload }) => {
  const { currency, total, items, sources } = payload;
  const { formatCurrency, formatPercent, locale } = useArtifactNumberFormat();

  const sorted = [...(items ?? [])].sort((a, b) => b.amount - a.amount);

  return (
    <section className="gf-cost" lang={locale}>
      <header className="gf-cost__head">
        <span className="gf-cost__eyebrow">{title ?? "Décomposition des coûts"}</span>
        <span className="gf-cost__total">
          Total
          <strong>{formatCurrency(total, currency)}</strong>
        </span>
      </header>

      <div className="gf-cost__rows">
        {sorted.map((item, idx) => {
          const pct = Math.max(0, Math.min(100, item.percentOfTotal));
          return (
            <div key={`${item.category}-${idx}`} className="gf-cost__row">
              <div className="gf-cost__category">{item.category}</div>
              <div className="gf-cost__bar-track" aria-hidden="true">
                <div className="gf-cost__bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="gf-cost__amount">{formatCurrency(item.amount, currency)}</div>
              <div className="gf-cost__pct">{formatPercent(pct)}</div>
            </div>
          );
        })}
      </div>

      {sources && sources.length > 0 ? (
        <footer className="gf-cost__sources">
          <span className="gf-cost__sources-label">Sources</span>
          {sources.join(" · ")}
        </footer>
      ) : null}
    </section>
  );
};

export default CostBreakdown;
