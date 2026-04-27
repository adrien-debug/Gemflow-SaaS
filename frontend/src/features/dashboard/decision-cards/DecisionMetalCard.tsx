import { FC } from "react";
import "./decision-cards.scss";

const DecisionMetalCard: FC = () => (
  <div className="gf-decision-card">
    <div className="gf-decision-card__header">
      <h3 className="gf-decision-card__title">Approvisionnement métal</h3>
      <p className="gf-decision-card__subtitle">Or · Platine · Acier</p>
    </div>
    <div className="gf-decision-card__body">
      <p className="gf-decision-card__placeholder">
        Demander au conseiller IA : spot en cours, couverture ouverte.
      </p>
    </div>
  </div>
);

export default DecisionMetalCard;
