import { FC } from "react";
import "./decision-cards.scss";

const DecisionMetalCard: FC = () => {
  return (
    <div className="gf-decision-card">
      <div className="gf-decision-card__header">
        <h3 className="gf-decision-card__title">Approvisionnement métal</h3>
        <p className="gf-decision-card__subtitle">Or, platine, acier</p>
      </div>
      <div className="gf-decision-card__body">
        <p className="gf-decision-card__placeholder">Données de spot en cours de chargement…</p>
      </div>
    </div>
  );
};

export default DecisionMetalCard;
