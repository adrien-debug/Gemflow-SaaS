import { FC } from "react";
import "./verdict-hero.scss";

interface VerdictHeroProps {
  ordersInProgress: number;
  alerts: Array<{ orderId: number; orderName: string; alertType: string; daysOverdue?: number }>;
  ordersByStatus?: Record<string, number>;
}

const VerdictHero: FC<VerdictHeroProps> = ({ ordersInProgress, alerts }) => {
  const alertList = alerts.slice(0, 3);
  const criticalCount = alertList.filter((a) => a.alertType === "OVERDUE").length;

  const lines: string[] = [];

  if (criticalCount > 0) {
    const pieceNames = alertList.filter((a) => a.alertType === "OVERDUE").map((a) => a.orderName);
    lines.push(`${criticalCount} pièce${criticalCount > 1 ? "s" : ""} en retard : ${pieceNames.join(", ")}.`);
  }

  if (alertList.some((a) => a.alertType === "AT_RISK")) {
    lines.push("Deux commandes approchent de la deadline critique.");
  }

  if (ordersInProgress > 0) {
    lines.push(`${ordersInProgress} commandes actives dans l'atelier.`);
  }

  const verdict =
    lines.length > 0
      ? lines.join(" ")
      : `L'atelier tient ses calendriers. ${ordersInProgress} commandes en cours, zéro risque immédiat.`;

  return (
    <div className="gf-verdict-hero">
      <p className="gf-verdict-hero__text">{verdict}</p>
    </div>
  );
};

export default VerdictHero;
