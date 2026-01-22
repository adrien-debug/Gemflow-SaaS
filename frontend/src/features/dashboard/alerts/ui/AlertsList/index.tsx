import { FC } from "react";
import Card from "antd/es/card";
import List from "antd/es/list";
import Tag from "antd/es/tag";
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

const getAlertConfig = (alertType: string) => {
  switch (alertType) {
    case "OVERDUE":
      return {
        color: "error",
        icon: <WarningOutlined />,
        label: "En retard",
      };
    case "AT_RISK":
      return {
        color: "warning",
        icon: <ClockCircleOutlined />,
        label: "À risque",
      };
    case "HIGH_PRIORITY":
      return {
        color: "processing",
        icon: <FireOutlined />,
        label: "Priorité haute",
      };
    default:
      return {
        color: "default",
        icon: <ClockCircleOutlined />,
        label: alertType,
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
                  <Tag color={config.color} icon={config.icon}>
                    {config.label}
                  </Tag>
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
    stroke="#52c41a"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

export default AlertsList;
