import { FC } from "react";
import Card from "antd/es/card";
import List from "antd/es/list";
import { Link } from "react-router";
import {
  WarningOutlined,
  ClockCircleOutlined,
  FireOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { OrderAlert } from "@entities/dashboard";
import "./styles.scss";

interface Props {
  alerts?: OrderAlert[];
  loading?: boolean;
}

const GOLD = "#C39A71";
const GOLD_DARK = "#A67D54";
const SIDER_BG = "#0C1220";

const getAlertConfig = (alertType: string) => {
  switch (alertType) {
    case "OVERDUE":
      return {
        icon: <WarningOutlined />,
        label: "En retard",
        bg: "rgba(195, 154, 113, 0.12)",
        color: GOLD_DARK,
      };
    case "AT_RISK":
      return {
        icon: <ClockCircleOutlined />,
        label: "À risque",
        bg: "rgba(12, 18, 32, 0.06)",
        color: SIDER_BG,
      };
    case "HIGH_PRIORITY":
      return {
        icon: <FireOutlined />,
        label: "Priorité haute",
        bg: "rgba(195, 154, 113, 0.18)",
        color: GOLD_DARK,
      };
    default:
      return {
        icon: <ClockCircleOutlined />,
        label: alertType,
        bg: "rgba(0, 0, 0, 0.04)",
        color: "rgba(0, 0, 0, 0.55)",
      };
  }
};

const AlertsList: FC<Props> = ({ alerts = [], loading }) => {
  const hasAlerts = alerts.length > 0;

  return (
    <Card
      title={
        <span className="alerts-title">
          <RobotOutlined style={{ marginRight: 8 }} />
          Prédictions & Alertes
        </span>
      }
      className="alerts-card"
      loading={loading}
    >
      {hasAlerts ? (
        <List
          dataSource={alerts}
          renderItem={(alert) => {
            const config = getAlertConfig(alert.alertType);
            return (
              <List.Item className="alert-item">
                <div className="alert-content">
                  <span
                    className="alert-tag"
                    style={{ background: config.bg, color: config.color }}
                  >
                    {config.icon}
                    <span style={{ marginLeft: 4 }}>{config.label}</span>
                  </span>
                  <Link to={`/orders/${alert.orderId}`} className="alert-order-name">
                    {alert.orderName}
                  </Link>
                  <span className="alert-message">{alert.message}</span>
                </div>
              </List.Item>
            );
          }}
        />
      ) : (
        <div className="no-alerts">
          <CheckCircleIcon />
          <p>Aucune alerte - Tout est sous contrôle !</p>
        </div>
      )}
    </Card>
  );
};

const CheckCircleIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke={GOLD}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

export default AlertsList;
