import { Card, Statistic, Row, Col, Spin, Alert, Button, Space } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  SyncOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useMetalPrices } from "@entities/ai-agent/hooks/useMetalPrices";
import "./styles.scss";

export const MetalPricesWidget = () => {
  const { data: prices, isLoading, isError, refetch, isFetching } = useMetalPrices();

  if (isLoading) {
    return (
      <div className="metal-prices-widget">
        <Card title="Prix des Métaux">
          <div style={{ textAlign: "center", padding: 32 }}>
            <Spin size="large" />
          </div>
        </Card>
      </div>
    );
  }

  if (isError || !prices) {
    return (
      <div className="metal-prices-widget">
        <Card title="Prix des Métaux">
          <Alert
            message="Erreur de chargement"
            description="Impossible de charger les prix des métaux"
            type="error"
            showIcon
          />
        </Card>
      </div>
    );
  }

  const getMetalIcon = (metal: string) => {
    const icons: Record<string, string> = {
      GOLD: "🥇",
      SILVER: "🥈",
      PLATINUM: "⚪",
      PALLADIUM: "⚫",
    };
    return icons[metal] || "💎";
  };

  return (
    <div className="metal-prices-widget">
      <Card
        title={
          <Space>
            <DollarOutlined />
            <span>Prix des Métaux</span>
          </Space>
        }
        extra={
          <Button
            icon={<SyncOutlined spin={isFetching} />}
            onClick={() => refetch()}
            loading={isFetching}
            size="small"
          >
            Actualiser
          </Button>
        }
      >
        <Row gutter={[16, 16]}>
          {prices.map((price) => {
            const isPositive = price.change24h ? price.change24h > 0 : null;
            const changeColor = isPositive ? "#3f8600" : isPositive === false ? "#cf1322" : undefined;

            return (
              <Col xs={24} sm={12} lg={6} key={price.metal}>
                <Card size="small" className="metal-card">
                  <div className="metal-icon">{getMetalIcon(price.metal)}</div>
                  <Statistic
                    title={price.metal}
                    value={price.price}
                    precision={2}
                    prefix="$"
                    suffix={`/${price.unit}`}
                    valueStyle={{ fontSize: 18 }}
                  />
                  {price.change24h !== undefined && price.change24h !== null && (
                    <div style={{ marginTop: 8 }}>
                      <Statistic
                        value={Math.abs(price.change24h)}
                        precision={2}
                        valueStyle={{
                          color: changeColor,
                          fontSize: 14,
                        }}
                        prefix={
                          isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                        }
                        suffix="%"
                      />
                    </div>
                  )}
                  <div className="metal-source">
                    Source: {price.source}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="prices-updated">
          Mis à jour : {prices[0] ? new Date(prices[0].timestamp).toLocaleString("fr-FR") : "N/A"}
        </div>
      </Card>
    </div>
  );
};
