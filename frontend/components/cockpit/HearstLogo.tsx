export function HearstLogo({ width = 22, height = 24 }: { width?: number; height?: number }) {
  return (
    <svg
      viewBox="560 455 155 170"
      width={width}
      height={height}
      fill="currentColor"
      style={{ color: "var(--ct-accent-strong)" }}
      aria-label="Hearst"
    >
      <polygon points="601.74 466.87 572.6 466.87 572.6 609.73 601.74 609.73 601.74 549.07 633.11 579.43 665.76 579.43 601.74 517.46 601.74 466.87" />
      <polygon points="672.72 466.87 672.72 528.12 644.63 500.93 611.98 500.93 672.72 559.72 672.72 609.73 701.86 609.73 701.86 466.87 672.72 466.87" />
    </svg>
  );
}
