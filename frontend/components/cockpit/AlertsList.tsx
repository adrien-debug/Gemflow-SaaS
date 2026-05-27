import type { FC } from "react";
import type { OrderAlert } from "@/lib/types";

interface Props {
  alerts: OrderAlert[];
}

const MAX_DISPLAY = 10;

const SEVERITY_ORDER: Record<OrderAlert["alertType"], number> = {
  OVERDUE: 0,
  AT_RISK: 1,
  HIGH_PRIORITY: 2,
};

const DEFAULT_BADGE_STYLE = {
  background: "color-mix(in oklab, var(--ct-text-muted) 15%, transparent)",
  color: "var(--ct-text-muted)",
};

const BADGE_STYLE: Record<OrderAlert["alertType"], { background: string; color: string; label: string }> = {
  OVERDUE: {
    background: "color-mix(in oklab, var(--ct-accent-strong) 20%, transparent)",
    color: "var(--ct-accent-strong)",
    label: "En retard",
  },
  AT_RISK: {
    background: "color-mix(in oklab, var(--ct-accent) 15%, transparent)",
    color: "color-mix(in oklab, var(--ct-accent) 80%, var(--ct-text-body))",
    label: "À risque",
  },
  HIGH_PRIORITY: {
    background: "color-mix(in oklab, var(--ct-accent) 25%, transparent)",
    color: "var(--ct-accent)",
    label: "Priorité haute",
  },
};

/**
 * AlertsList — pure UI server component.
 * Tri stable : OVERDUE > AT_RISK > HIGH_PRIORITY, puis daysOverdue desc.
 * Max 10 items affichés, surplus indiqué.
 */
const AlertsList: FC<Props> = ({ alerts }) => {
  if (alerts.length === 0) {
    return <p style={{ color: "var(--ct-text-muted)", margin: 0, fontSize: 14 }}>Aucune alerte.</p>;
  }

  const sorted = [...alerts].sort((a, b) => {
    const severityDiff = SEVERITY_ORDER[a.alertType] - SEVERITY_ORDER[b.alertType];
    if (severityDiff !== 0) return severityDiff;
    return b.daysOverdue - a.daysOverdue;
  });

  const displayed = sorted.slice(0, MAX_DISPLAY);
  const overflow = sorted.length - displayed.length;

  return (
    <div>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}>
        {displayed.map((alert) => {
          const badge = BADGE_STYLE[alert.alertType] ?? { label: alert.alertType, ...DEFAULT_BADGE_STYLE };
          return (
            <li
              key={`${alert.orderId}-${alert.alertType}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                fontSize: 13,
                lineHeight: 1.4,
              }}>
              {/* Badge sévérité */}
              <span
                style={{
                  flexShrink: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "2px 8px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  background: badge.background,
                  color: badge.color,
                  whiteSpace: "nowrap",
                }}>
                {badge.label}
              </span>

              {/* Contenu */}
              <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontWeight: 700,
                    color: "var(--ct-text-body)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                  {alert.orderName}
                </span>
                <span style={{ color: "var(--ct-text-muted)" }}>{alert.message}</span>
              </div>

              {/* Jours de retard */}
              {alert.daysOverdue > 0 && (
                <span
                  style={{
                    flexShrink: 0,
                    marginLeft: "auto",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--ct-accent-strong)",
                  }}>
                  {alert.daysOverdue}j
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {overflow > 0 && (
        <p
          style={{
            marginTop: 8,
            marginBottom: 0,
            fontSize: 12,
            color: "var(--ct-text-muted)",
          }}>
          + {overflow} de plus
        </p>
      )}
    </div>
  );
};

export default AlertsList;
