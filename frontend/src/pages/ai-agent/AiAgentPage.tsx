import { Typography, Row, Col, Space } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import { AiChat } from "@features/ai-agent/ai-chat/AiChat";
import { MetalPricesWidget } from "@features/ai-agent/metal-prices-widget/MetalPricesWidget";
import "./styles.scss";

const { Title, Paragraph } = Typography;

export const AiAgentPage = () => {
  return (
    <div className="ai-agent-page">
      <div className="page-header">
        <Space>
          <RobotOutlined style={{ fontSize: 32, color: "#1890ff" }} />
          <Title level={2} style={{ margin: 0 }}>
            Assistant IA
          </Title>
        </Space>
        <Paragraph style={{ marginTop: 8, color: "#666" }}>
          Votre assistant intelligent pour la gestion de la plateforme, les prix des métaux et
          l'import de commandes externes.
        </Paragraph>
      </div>

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
