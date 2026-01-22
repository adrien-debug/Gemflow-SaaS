import { Card, Spin, Alert, Button, Space, Tooltip } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  SyncOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { useMetalPrices } from "@entities/ai-agent/hooks/useMetalPrices";
import "./styles.scss";

interface MetalConfig {
  name: string;
  symbol: string;
  icon: string;
}

const metalConfigs: Record<string, MetalConfig> = {
  GOLD: { name: "Or", symbol: "XAU", icon: "🥇" },
  SILVER: { name: "Argent", symbol: "XAG", icon: "🥈" },
  PLATINUM: { name: "Platine", symbol: "XPT", icon: "💎" },
  PALLADIUM: { name: "Palladium", symbol: "XPD", icon: "⚫" },
};

export const MetalPricesWidget = () => {
  const { data: prices, isLoading, isError, refetch, isFetching } = useMetalPrices();

  if (isLoading) {
    return (
      <Card 
        className="metal-prices-card"
        title={
          <span className="card-title">
            <GoldOutlined />
            Prix des Métaux
          </span>
        }
      >
        <div className="loading-state">
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (isError || !prices) {
    return (
      <Card 
        className="metal-prices-card"
        title={
          <span className="card-title">
            <GoldOutlined />
            Prix des Métaux
          </span>
        }
      >
        <Alert message="Erreur de chargement" type="error" showIcon />
      </Card>
    );
  }

  return (
    <Card
      className="metal-prices-card"
      title={
        <span className="card-title">
          <GoldOutlined />
          Prix des Métaux
        </span>
      }
      extra={
        <Tooltip title="Actualiser les prix">
          <Button
            type="text"
            className="refresh-btn"
            icon={<SyncOutlined spin={isFetching} />}
            onClick={() => refetch()}
            size="small"
          />
        </Tooltip>
      }
    >
      <div className="metals-list">
        {prices.map((price) => {
          const config = metalConfigs[price.metal] || {
            name: price.metal,
            symbol: price.metal,
            icon: "💎",
          };
          
          const isPositive = price.change24h ? price.change24h > 0 : null;
          const changeValue = price.change24h ? Math.abs(price.change24h) : 0;

          return (
            <div key={price.metal} className="metal-row">
              <div className="metal-info">
                <span className="metal-icon">{config.icon}</span>
                <div className="metal-details">
                  <span className="metal-name">{config.name}</span>
                  <span className="metal-symbol">{config.symbol}</span>
                </div>
              </div>
              
              <div className="metal-price-section">
                <span className="metal-price">
                  ${price.price.toLocaleString("en-US", { 
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2 
                  })}
                  <span className="unit">/oz</span>
                </span>
                {price.change24h !== undefined && price.change24h !== null && (
                  <span className={`metal-change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {changeValue.toFixed(2)}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="prices-footer">
        Mis à jour : {prices[0] ? new Date(prices[0].timestamp).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit"
        }) : "N/A"}
      </div>
    </Card>
  );
};
