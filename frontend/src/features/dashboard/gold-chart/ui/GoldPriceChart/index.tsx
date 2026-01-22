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
  save_image: boolean;
  container_id: string;
  hide_side_toolbar: boolean;
  allow_symbol_change: boolean;
  studies: string[];
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
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: containerId,
          hide_side_toolbar: true,
          allow_symbol_change: false,
          studies: ["MASimple@tv-basicstudies"],
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
