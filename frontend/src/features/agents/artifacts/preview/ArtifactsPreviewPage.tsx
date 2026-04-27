import { FC, useMemo, useState } from "react";
import AgentResponseView from "../AgentResponseView";
import {
  AgentChatResponse,
  Artifact,
  ArtifactType,
  CalloutPayload,
  CostBreakdownPayload,
  KpiGridPayload,
  MetricCardPayload,
  PriceRecommendationPayload,
  TablePayload,
} from "../types";
import { ArtifactLocale, ArtifactLocaleContext } from "../hooks/useArtifactNumberFormat";
import "../styles/artifacts.scss";

import pricingCompleteRaw from "../__fixtures__/pricing-complete.json?raw";
import simpleQuestionRaw from "../__fixtures__/simple-question.json?raw";
import errorRaw from "../__fixtures__/error.json?raw";
import maxIterationsRaw from "../__fixtures__/max-iterations.json?raw";

const parse = (raw: string): AgentChatResponse => JSON.parse(raw) as AgentChatResponse;

const fixtures: Array<{ name: string; tag: string; response: AgentChatResponse }> = [
  { name: "Pricing complet", tag: "SUCCESS · 5 artifacts", response: parse(pricingCompleteRaw) },
  { name: "Question simple", tag: "SUCCESS · 0 artifact", response: parse(simpleQuestionRaw) },
  { name: "Erreur agent", tag: "ERROR", response: parse(errorRaw) },
  { name: "Max iterations", tag: "MAX_ITERATIONS", response: parse(maxIterationsRaw) },
];

const isolatedSamples: Array<{ name: string; artifact: Artifact }> = [
  {
    name: "metric_card",
    artifact: {
      type: "metric_card",
      title: null,
      payload: {
        value: 11430,
        label: "Coût total de revient",
        unit: "USD",
        deltaPercent: 2.3,
        sublabel: "Calculé depuis order_stock.total_cost",
      } satisfies MetricCardPayload,
    },
  },
  {
    name: "kpi_grid",
    artifact: {
      type: "kpi_grid",
      title: null,
      payload: {
        items: [
          { value: 11430, label: "Coût total", unit: "USD", deltaPercent: 2.3, sublabel: "+2.3% sur 24 h" },
          { value: 42.5, label: "Marge implicite", unit: "%", deltaPercent: null, sublabel: "vs 38 % collec." },
          { value: 38, label: "Délai moyen", unit: "j", deltaPercent: -10.5, sublabel: "−4 j vs cible" },
          { value: 47, label: "Comparables", unit: null, deltaPercent: null, sublabel: "Estate · 24 mois" },
        ],
      } satisfies KpiGridPayload,
    },
  },
  {
    name: "table",
    artifact: {
      type: "table",
      title: "Comparables Estate · 24 mois",
      payload: {
        columns: [
          { key: "indicator", label: "Indicateur", align: "left" },
          { key: "value", label: "Valeur", align: "right" },
        ],
        rows: [
          { indicator: "Nombre de pièces", value: 47 },
          { indicator: "Prix médian (USD)", value: 19600 },
          { indicator: "Prix minimum (USD)", value: 11200 },
          { indicator: "Prix maximum (USD)", value: 31400 },
          { indicator: "Prix moyen (USD)", value: 20180 },
        ],
        footer: { indicator: "Total ligne synthèse", value: 5 },
      } satisfies TablePayload,
    },
  },
  {
    name: "price_recommendation",
    artifact: {
      type: "price_recommendation",
      title: "Recommandation — Order #42",
      payload: {
        currency: "USD",
        low: 18200,
        mid: 20500,
        high: 22800,
        impliedMarginPercent: 42.5,
        drivers: [
          "Coût matière 6 850 USD (or 18k, 14.2 g)",
          "Comparables Estate 24 mois : médiane 19 600 USD",
          "Sertissage pavé 18.5 h vs 14 h moyenne collection",
        ],
        risks: [
          "Or spot +2.3% sur 24h — coût matière à 7 008 USD si livraison > 30j",
        ],
        sources: [
          "get_order_cost_breakdown",
          "get_similar_orders_pricing",
          "get_metal_live_prices",
        ],
      } satisfies PriceRecommendationPayload,
    },
  },
  {
    name: "cost_breakdown",
    artifact: {
      type: "cost_breakdown",
      title: "Décomposition des coûts",
      payload: {
        currency: "USD",
        total: 11430,
        items: [
          { category: "Métal (or 18k)", amount: 6850, percentOfTotal: 59.9 },
          { category: "Diamants", amount: 2900, percentOfTotal: 25.4 },
          { category: "Main-d'œuvre", amount: 1480, percentOfTotal: 12.9 },
          { category: "Gemmes colorées", amount: 200, percentOfTotal: 1.8 },
        ],
        sources: ["get_order_cost_breakdown"],
      } satisfies CostBreakdownPayload,
    },
  },
  {
    name: "callout (info)",
    artifact: {
      type: "callout",
      title: null,
      payload: {
        level: "info",
        title: "Donnée auxiliaire",
        body: "Aucune commande similaire n'a été trouvée sur les 24 derniers mois pour cette typologie.",
      } satisfies CalloutPayload,
    },
  },
  {
    name: "callout (warning)",
    artifact: {
      type: "callout",
      title: null,
      payload: {
        level: "warning",
        title: "Volatilité métal",
        body: "L'or a progressé de 2.3 % en 24 h. Si la livraison est repoussée au-delà de 30 jours, recalculer le coût matière avant de figer le prix client.",
      } satisfies CalloutPayload,
    },
  },
  {
    name: "callout (critical)",
    artifact: {
      type: "callout",
      title: null,
      payload: {
        level: "critical",
        title: "Stock insuffisant",
        body: "Le stock courant d'or 18k (4.8 g) est inférieur au besoin (14.2 g). Lancer un approvisionnement avant casting.",
      } satisfies CalloutPayload,
    },
  },
];

const unknownTypeArtifact: Artifact = {
  type: "metric_trend" as unknown as ArtifactType,
  title: "Type inconnu (forward-compat)",
  payload: { foo: "bar" } as never,
};

const pageStyle = {
  background: "#F7F3EB",
  minHeight: "100vh",
  padding: "32px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "32px",
};

const sectionStyle = {
  background: "#FFFCF5",
  border: "1px solid #E0D8C5",
  borderRadius: "10px",
  padding: "24px 28px",
  boxShadow: "0 1px 2px rgba(14,22,38,.06), 0 8px 24px -10px rgba(14,22,38,.18)",
};

const headStyle = {
  fontFamily: '"Inter Tight", "Inter", sans-serif',
  fontSize: "28px",
  fontWeight: 600,
  letterSpacing: "-0.03em",
  color: "#0F0F0E",
  margin: 0,
};

const eyebrowStyle = {
  fontFamily: '"Geist Mono", ui-monospace, monospace',
  fontSize: "10px",
  letterSpacing: "0.24em",
  textTransform: "uppercase" as const,
  color: "#8E6B43",
  fontWeight: 500,
  marginBottom: "10px",
};

const subheadStyle = {
  fontFamily: '"Geist Mono", ui-monospace, monospace',
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#6B655A",
  margin: "0 0 16px",
};

const tagStyle = {
  fontFamily: '"Geist Mono", ui-monospace, monospace',
  fontSize: "10px",
  letterSpacing: "0.16em",
  color: "rgba(195,154,113,.85)",
  textTransform: "uppercase" as const,
  marginLeft: "auto",
};

const localeBtnStyle = (active: boolean) => ({
  fontFamily: '"Geist Mono", ui-monospace, monospace',
  fontSize: "11px",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  padding: "6px 12px",
  border: `1px solid ${active ? "#C39A71" : "#E0D8C5"}`,
  background: active ? "#131C30" : "#FFFCF5",
  color: active ? "#C39A71" : "#3D3A33",
  cursor: "pointer",
  borderRadius: "3px",
});

const ArtifactsPreviewPage: FC = () => {
  const [locale, setLocale] = useState<ArtifactLocale>("fr-FR");

  const isolatedAndUnknown: Array<{ name: string; artifact: Artifact }> = useMemo(
    () => [...isolatedSamples, { name: "type inconnu (silencieux)", artifact: unknownTypeArtifact }],
    [],
  );

  return (
    <ArtifactLocaleContext.Provider value={locale}>
      <div style={pageStyle}>
        <header style={{ display: "flex", alignItems: "end", gap: "24px" }}>
          <div>
            <div style={eyebrowStyle}>Dev preview</div>
            <h1 style={headStyle}>Agent artifacts — rendu Maison</h1>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
            <button
              type="button"
              style={localeBtnStyle(locale === "fr-FR")}
              onClick={() => setLocale("fr-FR")}
            >
              fr-FR
            </button>
            <button
              type="button"
              style={localeBtnStyle(locale === "en-US")}
              onClick={() => setLocale("en-US")}
            >
              en-US
            </button>
          </div>
        </header>

        <section style={sectionStyle}>
          <p style={subheadStyle}>Section 1 — Réponses complètes (AgentResponseView)</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {fixtures.map(({ name, tag, response }) => (
              <div key={name}>
                <div style={{ display: "flex", alignItems: "baseline", marginBottom: "12px" }}>
                  <span style={{ ...eyebrowStyle, marginBottom: 0 }}>{name}</span>
                  <span style={tagStyle}>{tag}</span>
                </div>
                <AgentResponseView response={response} />
              </div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <p style={subheadStyle}>Section 2 — Artifacts isolés (un par type + cas inconnu)</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {isolatedAndUnknown.map(({ name, artifact }) => (
              <div key={name}>
                <div style={{ display: "flex", alignItems: "baseline", marginBottom: "12px" }}>
                  <span style={{ ...eyebrowStyle, marginBottom: 0 }}>{name}</span>
                </div>
                <AgentResponseView
                  response={{
                    conversationId: "preview",
                    agent: "preview",
                    model: "preview",
                    status: "SUCCESS",
                    errorMessage: null,
                    message: null,
                    toolsUsed: [],
                    artifacts: [artifact],
                    iterations: 0,
                    durationMs: 0,
                    usage: {
                      inputTokens: 0,
                      outputTokens: 0,
                      cacheReadTokens: 0,
                      cacheCreationTokens: 0,
                      costMicroUsd: 0,
                    },
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <p style={subheadStyle}>
            Section 3 — Devises (EUR · USD · CHF, locale {locale})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {(["EUR", "USD", "CHF"] as const).map((currency) => (
              <AgentResponseView
                key={currency}
                response={{
                  conversationId: `currency-${currency}`,
                  agent: "preview",
                  model: "preview",
                  status: "SUCCESS",
                  errorMessage: null,
                  message: `Currency · ${currency}`,
                  toolsUsed: [],
                  artifacts: [
                    {
                      type: "price_recommendation",
                      title: `Test devise ${currency}`,
                      payload: {
                        currency,
                        low: 18200,
                        mid: 20500,
                        high: 22800,
                        impliedMarginPercent: 42.5,
                        drivers: ["Test driver"],
                        risks: [],
                        sources: ["preview"],
                      },
                    },
                  ],
                  iterations: 0,
                  durationMs: 0,
                  usage: {
                    inputTokens: 0,
                    outputTokens: 0,
                    cacheReadTokens: 0,
                    cacheCreationTokens: 0,
                    costMicroUsd: 0,
                  },
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </ArtifactLocaleContext.Provider>
  );
};

export default ArtifactsPreviewPage;
