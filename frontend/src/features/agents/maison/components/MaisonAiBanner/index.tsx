import { FC, ReactNode } from "react";
import "./styles.scss";

interface MaisonAiBannerProps {
  title: ReactNode;
  body: ReactNode;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

const MaisonAiBanner: FC<MaisonAiBannerProps> = ({ title, body, ctaLabel, onCtaClick }) => {
  return (
    <div className="gf-maison-ai-banner">
      <div className="gf-maison-ai-banner__orb" aria-hidden />
      <div className="gf-maison-ai-banner__content">
        <div className="gf-maison-ai-banner__title">{title}</div>
        <div className="gf-maison-ai-banner__body">{body}</div>
      </div>
      {ctaLabel ? (
        <button type="button" className="gf-maison-ai-banner__cta" onClick={onCtaClick}>
          {ctaLabel}
        </button>
      ) : null}
    </div>
  );
};

export default MaisonAiBanner;
