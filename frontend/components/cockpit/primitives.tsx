import { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="ct-eyebrow">{children}</div>;
}

export function Title({ children }: { children: ReactNode }) {
  return <h1 className="ct-title">{children}</h1>;
}

export function Sub({ children }: { children: ReactNode }) {
  return <p className="ct-sub">{children}</p>;
}

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="ct-card">
      {title ? <div className="ct-card-title">{title}</div> : null}
      <div className="ct-card-body">{children}</div>
    </div>
  );
}

export function KpiGrid({ children }: { children: ReactNode }) {
  return <div className="ct-kpi-grid">{children}</div>;
}

export function KpiCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="ct-kpi">
      <div className="ct-kpi-label">{label}</div>
      <div className="ct-kpi-value">{value}</div>
      {hint ? <div className="ct-kpi-hint">{hint}</div> : null}
    </div>
  );
}
