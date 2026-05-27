import { type FC } from "react";
import type { StatusCount } from "@/lib/types";

interface Props {
  statuses: StatusCount[];
}

/**
 * Cockpit SVG donut — conventions SPEC §charts:
 *   viewBox 100×100, r="15.9155" → C ≈ 100
 *   bg track stroke-dasharray="100 0"
 *   each arc: `${pct} ${100-pct}` + strokeDashoffset = -cumul (sum of prior pct)
 *   SVG rotated -90° so arc starts at 12 o'clock
 *   colours via --ct-* tokens, never hardcoded hex
 */

const SIZE = 160;
const CX = 50;
const CY = 50;
const R = 15.9155;
const STROKE_W = 8;

const arcColor = (index: number): string => {
  if (index === 0) return "var(--ct-accent-strong)";
  if (index === 1) return "var(--ct-accent)";
  // 3rd+ : dégradé progressif en mélangeant accent avec text-muted
  const mix = Math.max(20, 60 - (index - 2) * 15);
  return `color-mix(in oklab, var(--ct-accent) ${mix}%, var(--ct-text-muted))`;
};

const StatusDonut: FC<Props> = ({ statuses }) => {
  const total = statuses.reduce((s, item) => s + item.count, 0);

  if (total === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 0",
          color: "var(--ct-text-muted)",
          fontSize: 14,
        }}>
        Aucune commande
      </div>
    );
  }

  // Compute percentage for each slice
  const slices = statuses.map((item) => ({
    ...item,
    pct: (item.count / total) * 100,
  }));

  // Build arcs — offsets computed via reduce (no mutation)
  const arcs = slices
    .reduce<{ slice: (typeof slices)[number]; offset: number }[]>((acc, slice) => {
      const offset = acc.reduce((sum, it) => sum + it.slice.pct, 0);
      return [...acc, { slice, offset }];
    }, [])
    .map(({ slice, offset }, i) => (
      <circle
        key={slice.status}
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke={arcColor(i)}
        strokeWidth={STROKE_W}
        strokeDasharray={`${slice.pct} ${100 - slice.pct}`}
        strokeDashoffset={-offset}
        strokeLinecap="round">
        <title>{`${slice.statusLabel} : ${slice.count} (${Math.round(slice.pct)}%)`}</title>
      </circle>
    ));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}>
      {/* Donut SVG */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox="0 0 100 100"
          style={{ transform: "rotate(-90deg)", display: "block" }}
          role="img"
          aria-label="Répartition par statut">
          {/* Background track */}
          <circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="var(--ct-surface-3)"
            strokeWidth={STROKE_W}
            strokeDasharray="100 0"
          />
          {arcs}
        </svg>
        {/* Centre label — counter-rotated so text is upright */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--ct-text-body)",
            }}>
            {total}
          </span>
          <span
            style={{
              fontSize: 10,
              color: "var(--ct-text-muted)",
              marginTop: 2,
              letterSpacing: "0.04em",
            }}>
            commandes
          </span>
        </div>
      </div>

      {/* Légende */}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}>
        {slices.map((slice, i) => (
          <li
            key={slice.status}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
            }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: arcColor(i),
                flexShrink: 0,
              }}
            />
            <span style={{ color: "var(--ct-text-body)", fontWeight: 500 }}>{slice.statusLabel}</span>
            <span style={{ color: "var(--ct-text-muted)", marginLeft: "auto" }}>
              {slice.count} ({Math.round(slice.pct)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusDonut;
