import { FC } from "react";
import { Link } from "react-router";
import { OrderAlert } from "@entities/dashboard";
import { MaisonCard } from "@features/agents/maison";
import "./styles.scss";

interface Props {
  alerts?: OrderAlert[];
  loading?: boolean;
}

type AlertTone = "danger" | "warning" | "info";

const TONE_BY_TYPE: Record<string, AlertTone> = {
  OVERDUE: "danger",
  AT_RISK: "warning",
  HIGH_PRIORITY: "warning",
};

const LABEL_BY_TYPE: Record<string, string> = {
  OVERDUE: "En retard",
  AT_RISK: "À risque",
  HIGH_PRIORITY: "Priorité haute",
};

const getTone = (alertType: string): AlertTone => TONE_BY_TYPE[alertType] ?? "info";
const getLabel = (alertType: string): string => LABEL_BY_TYPE[alertType] ?? alertType;

const AlertsList: FC<Props> = ({ alerts = [], loading }) => {
  const hasAlerts = alerts.length > 0;
  const count = alerts.length;

  return (
    <MaisonCard
      eyebrow="Atelier IA"
      title="Prédictions"
      emphasized="& Alertes"
      density="tight"
      loading={loading}
      actions={
        hasAlerts ? (
          <span className="gf-alerts-counter" data-tone="danger">
            {count.toString().padStart(2, "0")}
          </span>
        ) : (
          <span className="gf-alerts-counter" data-tone="quiet">
            00
          </span>
        )
      }
    >
      {hasAlerts ? (
        <ul className="gf-alerts-list">
          {alerts.map((alert) => {
            const tone = getTone(alert.alertType);
            return (
              <li key={`${alert.orderId}-${alert.alertType}`} className="gf-alerts-row" data-tone={tone}>
                <div className="gf-alerts-row__rule" aria-hidden />
                <div className="gf-alerts-row__body">
                  <div className="gf-alerts-row__head">
                    <span className="gf-alerts-row__tag">{getLabel(alert.alertType)}</span>
                    <Link to={`/orders/${alert.orderId}`} className="gf-alerts-row__order">
                      {alert.orderName}
                    </Link>
                  </div>
                  <p className="gf-alerts-row__msg">{alert.message}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="gf-alerts-empty">
          <p className="gf-alerts-empty__title">Tableau dégagé</p>
          <p className="gf-alerts-empty__body">
            Aucune alerte critique pour la fenêtre courante.
          </p>
        </div>
      )}
    </MaisonCard>
  );
};

export default AlertsList;
