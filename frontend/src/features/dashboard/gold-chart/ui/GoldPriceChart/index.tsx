import { FC, useEffect, useRef } from "react";
import { MaisonCard } from "@features/agents/maison";
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
          toolbar_bg: "#FFFCF5",
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
            "mainSeriesProperties.candleStyle.upColor": "#C39A71",
            "mainSeriesProperties.candleStyle.borderUpColor": "#C39A71",
            "mainSeriesProperties.candleStyle.wickUpColor": "#C39A71",
            "mainSeriesProperties.candleStyle.downColor": "#131C30",
            "mainSeriesProperties.candleStyle.borderDownColor": "#0A1224",
            "mainSeriesProperties.candleStyle.wickDownColor": "#0A1224",
            "paneProperties.background": "#FFFCF5",
            "paneProperties.vertGridProperties.color": "#ECE5D5",
            "paneProperties.horzGridProperties.color": "#ECE5D5",
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
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <MaisonCard
      eyebrow="XAU/USD · TradingView"
      title="Cours de l'"
      emphasized="Or"
      density="flush"
      actions={<span className="gf-maison-card-badge">Live</span>}
    >
      <div className="gold-price-chart-container">
        <div id="tradingview_gold_chart" ref={containerRef} className="tradingview-widget" />
      </div>
    </MaisonCard>
  );
};

export default GoldPriceChart;
