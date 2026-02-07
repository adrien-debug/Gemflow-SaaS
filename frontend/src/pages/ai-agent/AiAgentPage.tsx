import { Row, Col } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import { AiChat } from "@features/ai-agent/ai-chat/AiChat";
import { MetalPricesWidget } from "@features/ai-agent/metal-prices-widget/MetalPricesWidget";
import PageHero from "@shared/ui/PageHero";
import "./styles.scss";

export const AiAgentPage = () => {
  return (
    <div className="ai-agent-page">
      <PageHero
        icon={<RobotOutlined />}
        badge="Artificial Intelligence"
        title="AI Assistant"
        subtitle="Your intelligent assistant for platform management, metal prices and external order imports"
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <AiChat />
        </Col>
        <Col xs={24} xl={8}>
          <MetalPricesWidget />
        </Col>
      </Row>
    </div>
  );
};

export default AiAgentPage;
