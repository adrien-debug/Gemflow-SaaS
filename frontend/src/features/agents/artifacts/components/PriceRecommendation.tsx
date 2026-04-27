import { FC } from "react";
import { PriceRecommendationPayload } from "../types";
import { useArtifactNumberFormat } from "../hooks/useArtifactNumberFormat";

interface PriceRecommendationProps {
  title?: string | null;
  payload: PriceRecommendationPayload;
}

const BULLET = "—";

const PriceRecommendation: FC<PriceRecommendationProps> = ({ title, payload }) => {
  const { currency, low, mid, high, impliedMarginPercent, drivers, risks, sources } = payload;
  const { formatCurrency, formatPercent, locale } = useArtifactNumberFormat();

  const formatPrice = (n: number) =>
    formatCurrency(n, currency, { currencyDisplay: "code", maximumFractionDigits: 0 })
      .replace(currency, "")
      .trim();

  return (
    <article className="gf-price-reco" lang={locale}>
      <header className="gf-price-reco__head">
        <span className="gf-price-reco__eyebrow">Recommandation</span>
        {title ? <h3 className="gf-price-reco__title">{title}</h3> : null}
      </header>

      <div className="gf-price-reco__brackets">
        <div className="gf-price-reco__bracket">
          <div className="gf-price-reco__bracket-value">{formatPrice(low)}</div>
          <div className="gf-price-reco__bracket-label">Bas</div>
        </div>
        <div className="gf-price-reco__bracket gf-price-reco__bracket--mid">
          <div className="gf-price-reco__bracket-value">{formatPrice(mid)}</div>
          <div className="gf-price-reco__bracket-label">Médian</div>
        </div>
        <div className="gf-price-reco__bracket">
          <div className="gf-price-reco__bracket-value">{formatPrice(high)}</div>
          <div className="gf-price-reco__bracket-label">Haut</div>
        </div>
        <div className="gf-price-reco__currency">{currency}</div>
      </div>

      <div className="gf-price-reco__margin">
        <span className="gf-price-reco__margin-label">Marge implicite</span>
        <span className="gf-price-reco__margin-leader" aria-hidden="true" />
        <span className="gf-price-reco__margin-value">{formatPercent(impliedMarginPercent)}</span>
      </div>

      {drivers && drivers.length > 0 ? (
        <section className="gf-price-reco__section">
          <h4 className="gf-price-reco__section-title">Facteurs</h4>
          <ul className="gf-price-reco__list">
            {drivers.map((d, idx) => (
              <li key={idx} className="gf-price-reco__item">
                <span className="gf-price-reco__item-bullet" aria-hidden="true">
                  {BULLET}
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {risks && risks.length > 0 ? (
        <section className="gf-price-reco__section">
          <h4 className="gf-price-reco__section-title">Risques</h4>
          <ul className="gf-price-reco__list">
            {risks.map((r, idx) => (
              <li key={idx} className="gf-price-reco__item">
                <span className="gf-price-reco__item-bullet" aria-hidden="true">
                  {BULLET}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {sources && sources.length > 0 ? (
        <footer className="gf-price-reco__sources">
          <span className="gf-price-reco__sources-label">Sources</span>
          {sources.join(" · ")}
        </footer>
      ) : null}
    </article>
  );
};

export default PriceRecommendation;
