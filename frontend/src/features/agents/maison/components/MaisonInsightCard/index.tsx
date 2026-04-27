import { FC, ReactNode } from "react";
import "./styles.scss";

interface MaisonInsightCardProps {
  title: string;
  children: ReactNode;
}

const MaisonInsightCard: FC<MaisonInsightCardProps> = ({ title, children }) => {
  return (
    <div className="gf-maison-insight-card">
      <div className="gf-maison-insight-card__title">{title}</div>
      <div className="gf-maison-insight-card__body">{children}</div>
    </div>
  );
};

export default MaisonInsightCard;
