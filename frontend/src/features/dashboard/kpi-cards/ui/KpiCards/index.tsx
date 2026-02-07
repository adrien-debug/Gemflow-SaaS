import { FC } from "react";
import Col from "antd/es/col";
import Row from "antd/es/row";
import {
  AppstoreOutlined,
  WarningOutlined,
  FieldTimeOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import KpiCard from "../KpiCard";
import { DashboardStats } from "@entities/dashboard";

interface Props {
  stats?: DashboardStats;
  loading?: boolean;
}

const GOLD = "#C39A71";
const GOLD_DARK = "#A67D54";
const SIDER_BG = "#0C1220";

const KpiCards: FC<Props> = ({ stats, loading }) => {
  const total = stats?.totalOrders ?? 0;
  const finished = stats?.ordersFinished ?? 0;
  const deliveryRate = total > 0 ? Math.round((finished / total) * 100) : 0;

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard
          title="Total commandes"
          value={total}
          icon={<AppstoreOutlined style={{ color: SIDER_BG }} />}
          loading={loading}
          linkTo="/orders"
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard
          title="En retard"
          value={stats?.ordersOverdue ?? 0}
          icon={<WarningOutlined style={{ color: GOLD_DARK }} />}
          valueStyle={{ color: stats?.ordersOverdue ? GOLD_DARK : undefined }}
          loading={loading}
          linkTo="/orders?filter=overdue"
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard
          title="Retard moyen"
          value={stats?.averageDelayDays ?? 0}
          suffix="jours"
          precision={1}
          icon={<FieldTimeOutlined style={{ color: GOLD_DARK }} />}
          valueStyle={{ color: stats?.averageDelayDays ? GOLD_DARK : undefined }}
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <KpiCard
          title="Taux de livraison"
          value={deliveryRate}
          suffix="%"
          icon={<TrophyOutlined style={{ color: GOLD }} />}
          loading={loading}
        />
      </Col>
    </Row>
  );
};

export default KpiCards;
