import { FC } from "react";
import Col from "antd/es/col";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
import { Card, Space } from "antd";
import { RobotOutlined, DashboardOutlined } from "@ant-design/icons";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useDashboardStats } from "@entities/dashboard";
import { KpiCards } from "@features/dashboard/kpi-cards";
import { GoldPriceChart } from "@features/dashboard/gold-chart";
import { AlertsList } from "@features/dashboard/alerts";
import { StatusDistributionChart } from "@features/dashboard/status-chart";
import { AiChat } from "@features/ai-agent/ai-chat/AiChat";
import { MetalPricesWidget } from "@features/ai-agent/metal-prices-widget/MetalPricesWidget";
import "./styles.scss";

const { Title, Paragraph } = Typography;

const DashboardPage: FC = () => {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <CommonLayout>
      <div className="dashboard-page">
        {/* Welcome Header with Beautiful Gradient */}
        <div className="dashboard-welcome">
          <div className="welcome-content">
            <Space size={16} align="center">
              <DashboardOutlined className="welcome-icon" />
              <div>
                <Title level={2} className="welcome-title">
                  Bienvenue sur Gemsflow
                </Title>
                <Paragraph className="welcome-subtitle">
                  Votre plateforme intelligente de gestion de bijouterie
                </Paragraph>
              </div>
            </Space>
          </div>
        </div>

        {/* KPI Cards Row - Dynamic Stats */}
        <section className="dashboard-section">
          <KpiCards stats={stats} loading={isLoading} />
        </section>

        {/* Charts Row - Gold Price + Status Distribution + Metal Prices */}
        <section className="dashboard-section">
          <Row gutter={[24, 24]}>
            <Col xs={24} xl={10}>
              <GoldPriceChart />
            </Col>
            <Col xs={24} xl={8}>
              <StatusDistributionChart ordersByStatus={stats?.ordersByStatus} loading={isLoading} />
            </Col>
            <Col xs={24} xl={6}>
              <MetalPricesWidget />
            </Col>
          </Row>
        </section>

        {/* Alerts + AI Chat Section */}
        <section className="dashboard-section">
          <Row gutter={[24, 24]}>
            <Col xs={24} xl={10}>
              <AlertsList alerts={stats?.alerts} loading={isLoading} />
            </Col>
            <Col xs={24} xl={14}>
              <Card
                className="ai-chat-wrapper"
                title={
                  <Space>
                    <RobotOutlined style={{ fontSize: 20 }} />
                    <span style={{ fontSize: 18, fontWeight: 600 }}>
                      Assistant IA - Posez vos questions
                    </span>
                  </Space>
                }
              >
                <AiChat />
              </Card>
            </Col>
          </Row>
        </section>
      </div>
    </CommonLayout>
  );
};

export default DashboardPage;
