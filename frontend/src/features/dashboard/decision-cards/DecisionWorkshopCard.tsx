import { FC } from "react";
import "./decision-cards.scss";

const TERMINAL_STATUSES = new Set([
  "FINISHED", "INVOICED", "READY_FOR_INVOICE",
  "QC_PASSED", "MOUNTING_COMPLETED", "SETTING_COMPLETED", "RECEIVED_FROM_CASTING",
]);

const STATUS_LABELS: Record<string, string> = {
  IN_MOUNTING: "Montage",
  IN_CAD: "CAD",
  IN_SETTING: "Sertissage",
  AT_THE_CASTING: "Fonte",
  PROTOTYPING: "Prototype",
  POLISHED: "Polissage",
  QUALITY_CONTROL: "Contrôle qualité",
};

interface DecisionWorkshopCardProps {
  ordersByStatus?: Record<string, number>;
}

const DecisionWorkshopCard: FC<DecisionWorkshopCardProps> = ({ ordersByStatus = {} }) => {
  const active = Object.entries(ordersByStatus)
    .filter(([status, count]) => !TERMINAL_STATUSES.has(status) && count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const bottleneck = active[0];

  return (
    <div className="gf-decision-card">
      <div className="gf-decision-card__header">
        <h3 className="gf-decision-card__title">Atelier</h3>
        <p className="gf-decision-card__subtitle">Charge et bottleneck</p>
      </div>
      <div className="gf-decision-card__body">
        {bottleneck ? (
          <>
            <p className="gf-decision-card__alert">
              Bottleneck : <strong>{STATUS_LABELS[bottleneck[0]] ?? bottleneck[0]}</strong> — {bottleneck[1]} pièces
            </p>
            <div className="gf-decision-card__breakdown">
              {active.slice(1).map(([status, count]) => (
                <div key={status} className="gf-decision-card__breakdown-row">
                  <span>{STATUS_LABELS[status] ?? status}</span>
                  <span className="gf-decision-card__value">{count}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="gf-decision-card__placeholder">Aucun en-cours en production.</p>
        )}
      </div>
    </div>
  );
};

export default DecisionWorkshopCard;
