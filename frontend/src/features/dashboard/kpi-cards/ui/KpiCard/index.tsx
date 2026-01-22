import { FC, ReactNode } from "react";
import { Link } from "react-router";
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
  linkTo?: string;
}

const KpiCard: FC<Props> = ({ title, value, icon, suffix, precision, valueStyle, loading, linkTo }) => {
  const cardContent = (
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
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="kpi-card-link">
        <Card className="kpi-card kpi-card-clickable" loading={loading}>
          {cardContent}
        </Card>
      </Link>
    );
  }

  return (
    <Card className="kpi-card" loading={loading}>
      {cardContent}
    </Card>
  );
};

export default KpiCard;
