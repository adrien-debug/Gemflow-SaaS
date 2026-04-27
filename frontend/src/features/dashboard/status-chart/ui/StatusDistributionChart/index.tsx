import { FC } from "react";
import { StatusCount } from "@entities/dashboard";
import { MaisonCard } from "@features/agents/maison";
import "./styles.scss";

interface Props {
  ordersByStatus?: StatusCount[];
  loading?: boolean;
}

// Palette Maison : alternance or / marine selon l'index, pas de mapping rigide.
const STATUS_PALETTE = ["#C39A71", "#131C30", "#A67D54", "#28324F", "#D4B391", "#3C4866"];

const StatusDistributionChart: FC<Props> = ({ ordersByStatus = [], loading }) => {
  const total = ordersByStatus.reduce((sum, item) => sum + item.count, 0);

  return (
    <MaisonCard
      eyebrow="Pipeline atelier"
      title="Répartition par"
      emphasized="statut"
      density="tight"
      loading={loading}
    >
      {ordersByStatus.length > 0 ? (
        <div className="gf-status-list">
          {ordersByStatus.map((item, idx) => {
            const pct = total > 0 ? Math.round((item.count / total) * 100) : 0;
            const color = STATUS_PALETTE[idx % STATUS_PALETTE.length];
            return (
              <div key={item.status} className="gf-status-row">
                <div className="gf-status-row__head">
                  <span className="gf-status-row__label">{item.statusLabel}</span>
                  <span className="gf-status-row__count">
                    {item.count}
                    <span className="gf-status-row__pct">{pct}%</span>
                  </span>
                </div>
                <div className="gf-status-row__track" aria-hidden>
                  <div
                    className="gf-status-row__fill"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="gf-status-empty">Aucune commande</div>
      )}
    </MaisonCard>
  );
};

export default StatusDistributionChart;
