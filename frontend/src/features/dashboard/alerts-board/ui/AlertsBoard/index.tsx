import { FC, useMemo } from "react";
import { Link } from "react-router";
import { OrderAlert } from "@entities/dashboard";
import { MaisonCard } from "@features/agents/maison";
import "./styles.scss";

interface Props {
  alerts?: OrderAlert[];
  loading?: boolean;
}

type BucketKey = "OVERDUE" | "AT_RISK" | "HIGH_PRIORITY";
type Tone = "danger" | "warning" | "info";

interface BucketDef {
  key: BucketKey;
  label: string;
  tone: Tone;
}

const BUCKETS: BucketDef[] = [
  { key: "OVERDUE", label: "En retard", tone: "danger" },
  { key: "AT_RISK", label: "À risque", tone: "warning" },
  { key: "HIGH_PRIORITY", label: "Priorité haute", tone: "info" },
];

const AlertsBoard: FC<Props> = ({ alerts = [], loading }) => {
  const grouped = useMemo(() => {
    const map = new Map<BucketKey, OrderAlert[]>();
    BUCKETS.forEach((b) => map.set(b.key, []));
    alerts.forEach((alert) => {
      const list = map.get(alert.alertType as BucketKey);
      if (list) list.push(alert);
    });
    map.get("OVERDUE")?.sort((a, b) => b.daysOverdue - a.daysOverdue);
    return map;
  }, [alerts]);

  const total = alerts.length;
  const counterTone: "danger" | "quiet" = total > 0 ? "danger" : "quiet";
  const counter = total.toString().padStart(2, "0");

  return (
    <MaisonCard
      eyebrow="Atelier IA"
      title="Prédictions"
      emphasized="& Alertes"
      density="tight"
      loading={loading}
      actions={
        <span className="gf-alerts-counter" data-tone={counterTone}>
          {counter}
        </span>
      }
    >
      {total > 0 ? (
        <div className="gf-alerts-board">
          {BUCKETS.map((bucket) => {
            const list = grouped.get(bucket.key) ?? [];
            if (list.length === 0) return null;
            return (
              <section key={bucket.key} className="gf-alerts-board__bucket" data-tone={bucket.tone}>
                <header className="gf-alerts-board__bucket-head">
                  <span className="gf-alerts-board__bucket-label">{bucket.label}</span>
                  <span className="gf-alerts-board__bucket-count">{list.length}</span>
                </header>
                <ul className="gf-alerts-board__list">
                  {list.map((alert) => (
                    <li key={`${alert.orderId}-${alert.alertType}`} className="gf-alerts-board__row">
                      <div className="gf-alerts-board__rule" aria-hidden />
                      <div className="gf-alerts-board__row-body">
                        <div className="gf-alerts-board__row-head">
                          <Link to={`/orders/${alert.orderId}`} className="gf-alerts-board__order">
                            {alert.orderName}
                          </Link>
                          {bucket.key === "OVERDUE" && alert.daysOverdue > 0 ? (
                            <span className="gf-alerts-board__delay">+{alert.daysOverdue} j</span>
                          ) : null}
                        </div>
                        <p className="gf-alerts-board__msg">{alert.message}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="gf-alerts-board__empty">
          <p className="gf-alerts-board__empty-title">Tableau dégagé</p>
          <p className="gf-alerts-board__empty-body">
            Aucune alerte critique pour la fenêtre courante.
          </p>
        </div>
      )}
    </MaisonCard>
  );
};

export default AlertsBoard;
