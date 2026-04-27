import { FC, ReactNode } from "react";
import "./styles.scss";

interface MaisonPageHeaderProps {
  eyebrow: ReactNode;
  title: string;
  emphasized?: string;
  emphasizedPosition?: "before" | "after";
  coordinates?: { lat: string; lon: string };
}

const MaisonPageHeader: FC<MaisonPageHeaderProps> = ({
  eyebrow,
  title,
  emphasized,
  emphasizedPosition = "after",
  coordinates,
}) => {
  return (
    <header className="gf-maison-page-header">
      <div className="gf-maison-page-header__eyebrow">
        <span>{eyebrow}</span>
        {coordinates ? (
          <span className="gf-maison-page-header__coord">
            {coordinates.lat}
            <b>°N</b> / {coordinates.lon}
            <b>°E</b>
          </span>
        ) : null}
      </div>
      <h1 className="gf-maison-page-header__title">
        {emphasized && emphasizedPosition === "before" ? <em>{emphasized} </em> : null}
        {title}
        {emphasized && emphasizedPosition === "after" ? <em> {emphasized}</em> : null}
      </h1>
    </header>
  );
};

export default MaisonPageHeader;
