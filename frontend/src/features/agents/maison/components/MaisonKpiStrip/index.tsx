import { FC, ReactNode } from "react";
import "./styles.scss";

export interface MaisonKpi {
  label: string;
  value: ReactNode;
  unit?: ReactNode;
  unitPosition?: "before" | "after";
  tone?: "default" | "danger" | "success";
}

interface MaisonKpiStripProps {
  items: MaisonKpi[];
}

const MaisonKpiStrip: FC<MaisonKpiStripProps> = ({ items }) => {
  return (
    <div className="gf-maison-kpi-strip" style={{ ["--gf-kpi-cols" as string]: items.length }}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`gf-maison-kpi-strip__card${item.tone && item.tone !== "default" ? ` is-${item.tone}` : ""}`}>
          <div className="gf-maison-kpi-strip__label">{item.label}</div>
          <div className="gf-maison-kpi-strip__value">
            {item.unit && item.unitPosition === "before" ? (
              <span className="gf-maison-kpi-strip__unit gf-maison-kpi-strip__unit--before">{item.unit}</span>
            ) : null}
            {item.value}
            {item.unit && item.unitPosition !== "before" ? (
              <span className="gf-maison-kpi-strip__unit gf-maison-kpi-strip__unit--after">{item.unit}</span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaisonKpiStrip;
