import { FC } from "react";
import Card from "antd/es/card";
import Progress from "antd/es/progress";
import { StatusCount } from "@entities/dashboard";
import "./styles.scss";

interface Props {
  ordersByStatus?: StatusCount[];
  loading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  IN_CAD: "#1890ff",
  PROTOTYPING: "#13c2c2",
  AT_THE_CASTING: "#fa8c16",
  RECEIVED_FROM_CASTING: "#faad14",
  IN_MOUNTING: "#722ed1",
  MOUNTING_COMPLETED: "#eb2f96",
  IN_SETTING: "#2f54eb",
  SETTING_COMPLETED: "#52c41a",
  POLISHED: "#87d068",
  QUALITY_CONTROL: "#108ee9",
  QC_PASSED: "#73d13d",
  READY_FOR_INVOICE: "#9254de",
  INVOICED: "#52c41a",
  FINISHED: "#389e0d",
  REJECTED: "#ff4d4f",
  RECYCLED: "#8c8c8c",
};

const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status] || "#1890ff";
};

const StatusDistributionChart: FC<Props> = ({ ordersByStatus = [], loading }) => {
  const total = ordersByStatus.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card 
      title="Répartition par statut" 
      className="status-distribution-card"
      loading={loading}
    >
      <div className="status-list">
        {ordersByStatus.length > 0 ? (
          ordersByStatus.map((item) => {
            const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
            const color = getStatusColor(item.status);
            
            return (
              <div key={item.status} className="status-item">
                <div className="status-header">
                  <span className="status-label" style={{ color }}>
                    {item.statusLabel}
                  </span>
                  <span className="status-count">
                    {item.count} ({percentage}%)
                  </span>
                </div>
                <Progress
                  percent={percentage}
                  showInfo={false}
                  strokeColor={color}
                  trailColor="#f0f0f0"
                  size="small"
                />
              </div>
            );
          })
        ) : (
          <div className="no-data">Aucune commande</div>
        )}
      </div>
    </Card>
  );
};

export default StatusDistributionChart;
