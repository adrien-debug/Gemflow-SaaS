import { FC, useEffect, useRef } from "react";
import Card from "antd/es/card";
import "./styles.scss";

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: TradingViewWidgetConfig) => void;
    };
  }
}

interface TradingViewWidgetConfig {
  autosize: boolean;
  symbol: string;
  interval: string;
  timezone: string;
  theme: string;
  style: string;
  locale: string;
  toolbar_bg: string;
  enable_publishing: boolean;
  hide_top_toolbar: boolean;
  hide_legend: boolean;
  hide_volume?: boolean;
  save_image: boolean;
  container_id: string;
  hide_side_toolbar: boolean;
  allow_symbol_change: boolean;
  studies: string[];
  overrides?: Record<string, string>;
}

const GoldPriceChart: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    const containerId = "tradingview_gold_chart";

    const initWidget = () => {
      if (containerRef.current && window.TradingView) {
        // Clear previous widget
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = "";
        }

        new window.TradingView.widget({
          autosize: true,
          symbol: "OANDA:XAUUSD",
          interval: "D",
          timezone: "Europe/Paris",
          theme: "light",
          style: "1",
          locale: "fr",
          toolbar_bg: "#ffffff",
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_legend: true,
          save_image: false,
          container_id: containerId,
          hide_side_toolbar: true,
          allow_symbol_change: false,
          hide_volume: true,
          studies: [],
          overrides: {
            // Candles UP = Gold
            "mainSeriesProperties.candleStyle.upColor": "#C39A71",
            "mainSeriesProperties.candleStyle.borderUpColor": "#C39A71",
            "mainSeriesProperties.candleStyle.wickUpColor": "#C39A71",
            // Candles DOWN = Black
            "mainSeriesProperties.candleStyle.downColor": "#1a1a1a",
            "mainSeriesProperties.candleStyle.borderDownColor": "#222222",
            "mainSeriesProperties.candleStyle.wickDownColor": "#222222",
            // White background
            "paneProperties.background": "#ffffff",
            "paneProperties.vertGridProperties.color": "#f0f0f0",
            "paneProperties.horzGridProperties.color": "#f0f0f0",
            // Hide volume
            "volumePaneSize": "tiny",
          },
        });
      }
    };

    if (!scriptLoaded.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
        initWidget();
      };
      document.head.appendChild(script);
    } else {
      initWidget();
    }

    return () => {
      // Cleanup on unmount
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <Card 
      title="Cours de l'Or (XAU/USD)" 
      className="gold-price-chart-card"
      extra={<span className="chart-live-badge">Live</span>}
    >
      <div className="gold-price-chart-container">
        <div id="tradingview_gold_chart" ref={containerRef} className="tradingview-widget" />
      </div>
    </Card>
  );
};

export default GoldPriceChart;
