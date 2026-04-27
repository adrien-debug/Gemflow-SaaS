import { FC } from "react";
import { useDashboardStats } from "@entities/dashboard";
import { AiChat } from "@features/ai-agent/ai-chat/AiChat";
import { MetalPricesWidget } from "@features/ai-agent/metal-prices-widget/MetalPricesWidget";
import {
  MaisonAiBanner,
  MaisonAiPanel,
  MaisonInsightCard,
  MaisonKpiStrip,
  MaisonPageHeader,
  type MaisonKpi,
} from "@features/agents/maison";
import "./styles.scss";

const formatCount = (n?: number) => (n ?? 0).toLocaleString("fr-FR");

const AiAgentPage: FC = () => {
  const { data: stats } = useDashboardStats();

  const activeOrders = stats?.ordersInProgress ?? 0;
  const overdue = stats?.ordersOverdue ?? 0;
  const finished = stats?.ordersFinished ?? 0;
  const totalOrders = stats?.totalOrders ?? 0;
  const completionRate = totalOrders > 0 ? Math.round((finished / totalOrders) * 100) : 0;

  const kpis: MaisonKpi[] = [
    {
      label: "Commandes Actives",
      value: formatCount(activeOrders),
    },
    {
      label: "Total Commandes",
      value: formatCount(totalOrders),
    },
    {
      label: "Risques Détectés",
      value: formatCount(overdue),
      tone: overdue > 0 ? "danger" : "default",
    },
    {
      label: "Taux Achevé",
      value: completionRate.toString(),
      unit: "%",
      unitPosition: "after",
      tone: completionRate >= 80 ? "success" : "default",
    },
  ];

  return (
    <div className="ai-agent-page">
      <div className="ai-agent-page__inner">
        <MaisonPageHeader
          eyebrow={<>Atelier Intelligence · v5.0 · Place Vendôme</>}
          title="Assistant"
          emphasized="d'Atelier"
          coordinates={{ lat: "48.8675", lon: "2.3287" }}
        />

        <MaisonKpiStrip items={kpis} />

        <MaisonAiBanner
          title="Conversation contextuelle"
          body={
            <>
              Pose une question, l'agent appelle les outils internes (commandes, stock, prix marché, comparables) et
              structure la réponse en <em>artifacts</em> lisibles.
            </>
          }
        />

        <div className="ai-agent-page__grid">
          <div className="ai-agent-page__main">
            <AiChat />
          </div>
          <div className="ai-agent-page__aside">
            <MaisonAiPanel
              title="Insights"
              emphasized="Atelier"
              subtitle="Neural Engine Active"
              body={
                <>
                  <p className="ai-agent-page__aside-eyebrow">Pistes du jour</p>
                  <MaisonInsightCard title="Charge atelier">
                    {activeOrders > 0 ? (
                      <>
                        <strong>{formatCount(activeOrders)}</strong> commandes actives. Vérifie le séquencement avant de
                        relancer un casting.
                      </>
                    ) : (
                      <>Aucune commande active. Bonne période pour rattraper les revues qualité.</>
                    )}
                  </MaisonInsightCard>
                  {overdue > 0 ? (
                    <MaisonInsightCard title="Alerte délais">
                      <strong>{formatCount(overdue)}</strong> commande
                      {overdue > 1 ? "s" : ""} en retard. Demande à l'agent un détail par client.
                    </MaisonInsightCard>
                  ) : null}
                  <MaisonInsightCard title="Volatilité métal">
                    Compare le coût matière courant aux comparables Estate avant de figer un prix client.
                  </MaisonInsightCard>
                </>
              }
            />
            <div className="ai-agent-page__metals">
              <MetalPricesWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAgentPage;
