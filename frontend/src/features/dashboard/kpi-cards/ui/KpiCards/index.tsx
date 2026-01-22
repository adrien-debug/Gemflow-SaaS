import { FC } from "react";
import Col from "antd/es/col";
import Row from "antd/es/row";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  SendOutlined,
  WarningOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import KpiCard from "../KpiCard";
import { DashboardStats } from "@entities/dashboard";

interface Props {
  stats?: DashboardStats;
  loading?: boolean;
}

const GOLD = "#C39A71";
const SIDER_BG = "#131C30";
const GOLD_DARK = "#A67D54";

const KpiCards: FC<Props> = ({ stats, loading }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={4}>
        <KpiCard
          title="En cours"
          value={stats?.ordersInProgress ?? 0}
          icon={<ClockCircleOutlined style={{ color: SIDER_BG }} />}
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={12} lg={5}>
        <KpiCard
          title="Terminées"
          value={stats?.ordersFinished ?? 0}
          icon={<CheckCircleOutlined style={{ color: GOLD }} />}
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={12} lg={5}>
        <KpiCard
          title="Facturées"
          value={stats?.ordersInvoiced ?? 0}
          icon={<SendOutlined style={{ color: GOLD }} />}
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={12} lg={5}>
        <KpiCard
          title="En retard"
          value={stats?.ordersOverdue ?? 0}
          icon={<WarningOutlined style={{ color: "#ff4d4f" }} />}
          valueStyle={{ color: stats?.ordersOverdue ? "#ff4d4f" : undefined }}
          loading={loading}
        />
      </Col>
      <Col xs={24} sm={12} lg={5}>
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
    </Row>
  );
};

export default KpiCards;
