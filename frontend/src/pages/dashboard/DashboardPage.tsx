import { FC } from "react";
import Col from "antd/es/col";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
import Statistic from "antd/es/statistic";
import { Card, Space } from "antd";
import {
  RobotOutlined,
  CrownOutlined,
  ThunderboltOutlined,
  RiseOutlined,
  GoldOutlined,
  AppstoreOutlined,
  WarningOutlined,
  FieldTimeOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useDashboardStats } from "@entities/dashboard";
import { GoldPriceChart } from "@features/dashboard/gold-chart";
import { AlertsList } from "@features/dashboard/alerts";
import { StatusDistributionChart } from "@features/dashboard/status-chart";
import { AiChat } from "@features/ai-agent/ai-chat/AiChat";
import { MetalPricesWidget } from "@features/ai-agent/metal-prices-widget/MetalPricesWidget";
import { JewelryGalleryWidget } from "@features/dashboard/jewelry-gallery";
import "./styles.scss";

const { Text } = Typography;

const DashboardPage: FC = () => {
  const { data: stats, isLoading } = useDashboardStats();

  const total = stats?.totalOrders ?? 0;
  const finished = stats?.ordersFinished ?? 0;
  const deliveryRate = total > 0 ? Math.round((finished / total) * 100) : 0;

  return (
    <CommonLayout>
      <div className="dashboard-page">
        {/* ===== HERO PREMIUM AVEC KPIs INTÉGRÉS ===== */}
        <div className="dash-hero-premium">
          <div className="dash-hero-premium__top">
            <div className="dash-hero-premium__left">
              <div className="dash-hero-premium__badge">
                <CrownOutlined />
                <span>Haute Joaillerie</span>
              </div>
              <h1 className="dash-hero-premium__title">Gemsflow</h1>
              <p className="dash-hero-premium__sub">Gestion intelligente de bijouterie haut de gamme</p>
            </div>
            <div className="dash-hero-premium__quick-stats">
              <div className="dash-hero-premium__quick-stat">
                <ThunderboltOutlined />
                <Text className="dash-hero-premium__quick-val">{stats?.ordersInProgress ?? 0}</Text>
                <Text className="dash-hero-premium__quick-lbl">En cours</Text>
              </div>
              <div className="dash-hero-premium__divider" />
              <div className="dash-hero-premium__quick-stat">
                <RiseOutlined />
                <Text className="dash-hero-premium__quick-val">{stats?.ordersFinished ?? 0}</Text>
                <Text className="dash-hero-premium__quick-lbl">Terminées</Text>
              </div>
              <div className="dash-hero-premium__divider" />
              <div className="dash-hero-premium__quick-stat">
                <GoldOutlined />
                <Text className="dash-hero-premium__quick-val">{stats?.ordersInvoiced ?? 0}</Text>
                <Text className="dash-hero-premium__quick-lbl">Facturées</Text>
              </div>
            </div>
          </div>

          <div className="dash-hero-premium__kpis">
            <div className="dash-hero-premium__kpi">
              <div className="dash-hero-premium__kpi-icon">
                <AppstoreOutlined />
              </div>
              <div className="dash-hero-premium__kpi-content">
                <Statistic title="Total commandes" value={total} loading={isLoading} />
              </div>
            </div>
            <div className="dash-hero-premium__kpi dash-hero-premium__kpi--warning">
              <div className="dash-hero-premium__kpi-icon">
                <WarningOutlined />
              </div>
              <div className="dash-hero-premium__kpi-content">
                <Statistic title="En retard" value={stats?.ordersOverdue ?? 0} loading={isLoading} />
              </div>
            </div>
            <div className="dash-hero-premium__kpi">
              <div className="dash-hero-premium__kpi-icon">
                <FieldTimeOutlined />
              </div>
              <div className="dash-hero-premium__kpi-content">
                <Statistic title="Retard moyen" value={stats?.averageDelayDays ?? 0} suffix="jours" precision={1} loading={isLoading} />
              </div>
            </div>
            <div className="dash-hero-premium__kpi dash-hero-premium__kpi--success">
              <div className="dash-hero-premium__kpi-icon">
                <TrophyOutlined />
              </div>
              <div className="dash-hero-premium__kpi-content">
                <Statistic title="Taux de livraison" value={deliveryRate} suffix="%" loading={isLoading} />
              </div>
            </div>
          </div>
        </div>

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

        {/* Jewelry Gallery Section */}
        <section className="dashboard-section">
          <JewelryGalleryWidget />
        </section>
      </div>
    </CommonLayout>
  );
};

export default DashboardPage;
