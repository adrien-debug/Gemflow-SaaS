import { FC } from "react";
import { MetricCardPayload } from "../types";
import { useArtifactNumberFormat } from "../hooks/useArtifactNumberFormat";

interface MetricCardProps {
  payload: MetricCardPayload;
  /**
   * Inverse la sémantique de couleur du delta (ex: pour un coût, +X% est défavorable).
   */
  invertDeltaSign?: boolean;
}

const formatDisplayValue = (value: string | number, formatter: (n: number) => string): string => {
  if (typeof value === "number") return formatter(value);
  const parsed = Number(value);
  if (!Number.isNaN(parsed) && value.trim() !== "") return formatter(parsed);
  return value;
};

const MetricCard: FC<MetricCardProps> = ({ payload, invertDeltaSign }) => {
  const { formatNumber, formatSignedPercent, locale } = useArtifactNumberFormat();
  const { value, label, unit, deltaPercent, sublabel } = payload;

  const displayValue = formatDisplayValue(value, (n) => formatNumber(n));

  const hasDelta = deltaPercent !== null && deltaPercent !== undefined && !Number.isNaN(deltaPercent);
  const effectiveSign = hasDelta && invertDeltaSign ? -deltaPercent! : (deltaPercent ?? 0);
  const deltaClass = !hasDelta
    ? ""
    : effectiveSign > 0
      ? "gf-metric-card__delta--up"
      : effectiveSign < 0
        ? "gf-metric-card__delta--down"
        : "";

  return (
    <div className="gf-metric-card" lang={locale}>
      <div className="gf-metric-card__label">{label}</div>
      <div className="gf-metric-card__row">
        <div className="gf-metric-card__value">{displayValue}</div>
        {unit ? <div className="gf-metric-card__unit">{unit}</div> : null}
      </div>
      {hasDelta ? (
        <div className={`gf-metric-card__delta ${deltaClass}`}>
          {formatSignedPercent(deltaPercent!)}
        </div>
      ) : null}
      {sublabel ? <div className="gf-metric-card__sublabel">{sublabel}</div> : null}
    </div>
  );
};

export default MetricCard;
