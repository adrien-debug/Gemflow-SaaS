import { FC } from "react";

interface AlertItem {
  orderId: number;
  orderName: string;
  alertType: string;
  message?: string;
  daysOverdue?: number;
}

interface DecisionRelationsCardProps {
  alerts?: AlertItem[];
}

const DecisionRelationsCard: FC<DecisionRelationsCardProps> = ({ alerts = [] }) => {
  const callToday = alerts.slice(0, 3).map((a) => ({
    name: a.orderName,
    type: a.alertType === "OVERDUE" ? "retard" : a.alertType === "AT_RISK" ? "risque" : "normal",
  }));

  return (
    <div className="gf-decision-card">
      <div className="gf-decision-card__header">
        <h3 className="gf-decision-card__title">Appels à faire aujourd'hui</h3>
        <p className="gf-decision-card__subtitle">Clients VIP + jalons critiques</p>
      </div>
      <div className="gf-decision-card__body">
        {callToday.length > 0 ? (
          <div className="gf-decision-card__calls">
            {callToday.map((call, i) => (
              <div key={i} className={`gf-decision-card__call gf-decision-card__call--${call.type}`}>
                <span className="gf-decision-card__call-dot" aria-hidden />
                <span className="gf-decision-card__call-text">{call.name}</span>
                <span className="gf-decision-card__call-tag">{call.type}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="gf-decision-card__placeholder">Aucun appel urgent aujourd'hui.</p>
        )}
      </div>
    </div>
  );
};

export default DecisionRelationsCard;
