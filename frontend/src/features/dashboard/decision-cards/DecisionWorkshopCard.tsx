import { FC } from "react";

interface DecisionWorkshopCardProps {
  ordersByStatus?: Record<string, number>;
}

const DecisionWorkshopCard: FC<DecisionWorkshopCardProps> = ({ ordersByStatus = {} }) => {
  const statusEntries = Object.entries(ordersByStatus).filter(([_, count]) => count > 0);
  const bottleneck = statusEntries.sort((a, b) => b[1] - a[1])[0];
  const bottleneckStatus = bottleneck?.[0] || "—";
  const bottleneckCount = bottleneck?.[1] || 0;

  return (
    <div className="gf-decision-card">
      <div className="gf-decision-card__header">
        <h3 className="gf-decision-card__title">Atelier</h3>
        <p className="gf-decision-card__subtitle">Charge et bottleneck</p>
      </div>
      <div className="gf-decision-card__body">
        <p className="gf-decision-card__alert">
          Bottleneck : <strong>{bottleneckStatus}</strong> ({bottleneckCount} pièces)
        </p>
        <div className="gf-decision-card__breakdown">
          {statusEntries.map(([status, count]) => (
            <div key={status} className="gf-decision-card__breakdown-row">
              <span>{status}</span>
              <span className="gf-decision-card__value">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecisionWorkshopCard;
