import { FC, ReactNode } from "react";
import Card from "antd/es/card";
import Statistic from "antd/es/statistic";
import "./styles.scss";

interface Props {
  title: string;
  value: number | string;
  icon?: ReactNode;
  suffix?: string;
  precision?: number;
  valueStyle?: React.CSSProperties;
  loading?: boolean;
}

const KpiCard: FC<Props> = ({ title, value, icon, suffix, precision, valueStyle, loading }) => {
  return (
    <Card className="kpi-card" loading={loading}>
      <div className="kpi-card-content">
        {icon && <div className="kpi-card-icon">{icon}</div>}
        <Statistic
          title={title}
          value={value}
          suffix={suffix}
          precision={precision}
          valueStyle={valueStyle}
        />
      </div>
    </Card>
  );
};

export default KpiCard;
