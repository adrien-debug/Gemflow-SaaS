import { FC, ReactNode } from "react";
import "./styles.scss";

interface MaisonCardProps {
  eyebrow?: string;
  title?: string;
  emphasized?: string;
  actions?: ReactNode;
  density?: "default" | "tight" | "flush";
  loading?: boolean;
  className?: string;
  children: ReactNode;
}

const MaisonCard: FC<MaisonCardProps> = ({
  eyebrow,
  title,
  emphasized,
  actions,
  density = "default",
  loading,
  className,
  children,
}) => {
  const classes = ["gf-maison-card", `gf-maison-card--${density}`];
  if (loading) classes.push("gf-maison-card--loading");
  if (className) classes.push(className);

  const showHeader = Boolean(eyebrow || title || actions);

  return (
    <section className={classes.join(" ")}>
      {showHeader ? (
        <header className="gf-maison-card__head">
          <div className="gf-maison-card__head-text">
            {eyebrow ? <p className="gf-maison-card__eyebrow">{eyebrow}</p> : null}
            {title ? (
              <h3 className="gf-maison-card__title">
                {title}
                {emphasized ? <em> {emphasized}</em> : null}
              </h3>
            ) : null}
          </div>
          {actions ? <div className="gf-maison-card__actions">{actions}</div> : null}
        </header>
      ) : null}

      <div className="gf-maison-card__body">
        {loading ? <div className="gf-maison-card__skeleton" aria-hidden /> : children}
      </div>
    </section>
  );
};

export default MaisonCard;
