import { FC } from "react";
import "./verdict-hero.scss";

interface VerdictHeroProps {
  ordersInProgress: number;
  overdueCount: number;
  atRiskCount: number;
}

const VerdictHero: FC<VerdictHeroProps> = ({ ordersInProgress, overdueCount, atRiskCount }) => {
  if (overdueCount === 0 && atRiskCount === 0) {
    return (
      <div className="gf-verdict-hero">
        <p className="gf-verdict-hero__text">
          L'atelier tient ses calendriers. {ordersInProgress} commandes actives, zéro risque immédiat.
        </p>
      </div>
    );
  }

  const parts: string[] = [];
  if (overdueCount > 0) parts.push(`${overdueCount} pièce${overdueCount > 1 ? "s" : ""} en retard`);
  if (atRiskCount > 0) parts.push(`${atRiskCount} à risque`);
  parts.push(`${ordersInProgress} actives`);

  return (
    <div className="gf-verdict-hero">
      <p className="gf-verdict-hero__text">{parts.join(". ")}.</p>
    </div>
  );
};

export default VerdictHero;
