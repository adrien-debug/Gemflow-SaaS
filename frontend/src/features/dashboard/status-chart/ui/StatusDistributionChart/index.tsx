import { FC } from "react";
import Card from "antd/es/card";
import Progress from "antd/es/progress";
import { StatusCount } from "@entities/dashboard";
import "./styles.scss";

interface Props {
  ordersByStatus?: StatusCount[];
  loading?: boolean;
}

// Palette or/gris uniquement — dégradés de la brand color #C39A71
const STATUS_COLORS: Record<string, string> = {
  IN_CAD: "#C39A71",
  PROTOTYPING: "#B8905F",
  AT_THE_CASTING: "#A67D54",
  RECEIVED_FROM_CASTING: "#D4AC84",
  IN_MOUNTING: "#0C1220",
  MOUNTING_COMPLETED: "#1A2640",
  IN_SETTING: "#9C7B5A",
  SETTING_COMPLETED: "#755C44",
  POLISHED: "#C39A71",
  QUALITY_CONTROL: "#4E3E2D",
  QC_PASSED: "#A67D54",
  READY_FOR_INVOICE: "#D4AC84",
  INVOICED: "#9C7B5A",
  FINISHED: "#0C1220",
  REJECTED: "#4E3E2D",
  RECYCLED: "#755C44",
};

const getStatusColor = (status: string): string => {
  return STATUS_COLORS[status] || "#C39A71";
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
                  trailColor="#F6F0EA"
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
