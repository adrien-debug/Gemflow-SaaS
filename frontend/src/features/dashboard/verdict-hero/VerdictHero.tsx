import { FC } from "react";
import "./verdict-hero.scss";

interface VerdictHeroProps {
  ordersInProgress: number;
  overdueCount: number;
  atRiskCount: number;
}

const VerdictHero: FC<VerdictHeroProps> = ({ ordersInProgress, overdueCount, atRiskCount }) => {
  const renderText = () => {
    if (overdueCount === 0 && atRiskCount === 0) {
      return `L'atelier tient ses calendriers. ${ordersInProgress} commandes actives, zéro risque immédiat.`;
    }
    const parts: string[] = [];
    if (overdueCount > 0) parts.push(`${overdueCount} pièce${overdueCount > 1 ? "s" : ""} en retard`);
    if (atRiskCount > 0) parts.push(`${atRiskCount} à risque`);
    parts.push(`${ordersInProgress} actives`);
    return `${parts.join(". ")}.`;
  };

  return (
    <div className="gf-verdict-hero">
      <p className="gf-verdict-hero__eyebrow">Verdict · Atelier</p>
      <p className="gf-verdict-hero__text">{renderText()}</p>
    </div>
  );
};

export default VerdictHero;
