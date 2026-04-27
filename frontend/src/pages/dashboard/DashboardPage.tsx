import { FC } from "react";
import { Link } from "react-router";
import Col from "antd/es/col";
import Row from "antd/es/row";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useDashboardStats } from "@entities/dashboard";
import { GoldPriceChart } from "@features/dashboard/gold-chart";
import { AlertsList } from "@features/dashboard/alerts";
import { StatusDistributionChart } from "@features/dashboard/status-chart";
import { MetalPricesWidget } from "@features/ai-agent/metal-prices-widget/MetalPricesWidget";
import { JewelryGalleryWidget } from "@features/dashboard/jewelry-gallery";
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

const DashboardPage: FC = () => {
  const { data: stats, isLoading } = useDashboardStats();

  const totalOrders = stats?.totalOrders ?? 0;
  const inProgress = stats?.ordersInProgress ?? 0;
  const finished = stats?.ordersFinished ?? 0;
  const overdue = stats?.ordersOverdue ?? 0;
  const averageDelay = stats?.averageDelayDays ?? 0;
  const alertsCount = stats?.alerts?.length ?? 0;
  const deliveryRate = totalOrders > 0 ? Math.round((finished / totalOrders) * 100) : 0;

  const kpis: MaisonKpi[] = [
    { label: "Commandes Actives", value: formatCount(inProgress) },
    { label: "Total Commandes", value: formatCount(totalOrders) },
    {
      label: "En Retard",
      value: formatCount(overdue),
      tone: overdue > 0 ? "danger" : "default",
    },
    {
      label: "Taux Livraison",
      value: deliveryRate.toString(),
      unit: "%",
      unitPosition: "after",
      tone: deliveryRate >= 80 ? "success" : "default",
    },
  ];

  return (
    <CommonLayout>
      <div className="dashboard-page">
        <div className="dashboard-page__inner">
          <MaisonPageHeader
            eyebrow="Atelier Intelligence · v5.0 · Place Vendôme"
            title="Carnet"
            emphasized="d'Atelier"
            coordinates={{ lat: "48.8675", lon: "2.3287" }}
          />

          <MaisonKpiStrip items={kpis} />

          {overdue > 0 ? (
            <MaisonAiBanner
              title="Attention aux délais"
              body={
                <>
                  <strong>{formatCount(overdue)}</strong> commande
                  {overdue > 1 ? "s" : ""} en retard. Demande à l'agent un <em>point client par client</em> avant la
                  prochaine revue.
                </>
              }
            />
          ) : (
            <MaisonAiBanner
              title="Atelier fluide"
              body={
                <>
                  Aucun retard significatif. Profite de la fenêtre pour interroger l'agent sur les{" "}
                  <em>opportunités de pricing</em>.
                </>
              }
            />
          )}

          <div className="dashboard-page__grid">
            <div className="dashboard-page__main">
              <section className="dashboard-page__section">
                <Row gutter={[24, 24]}>
                  <Col xs={24} xl={14}>
                    <GoldPriceChart />
                  </Col>
                  <Col xs={24} xl={10}>
                    <StatusDistributionChart ordersByStatus={stats?.ordersByStatus} loading={isLoading} />
                  </Col>
                </Row>
              </section>

              <section className="dashboard-page__section">
                <AlertsList alerts={stats?.alerts} loading={isLoading} />
              </section>

              <section className="dashboard-page__section">
                <JewelryGalleryWidget />
              </section>
            </div>

            <aside className="dashboard-page__aside">
              <MaisonAiPanel
                title="Insights"
                emphasized="Atelier"
                subtitle="Neural Engine Active"
                body={
                  <>
                    <p className="dashboard-page__aside-eyebrow">Pistes du jour</p>

                    <MaisonInsightCard title="Charge atelier">
                      {inProgress > 0 ? (
                        <>
                          <strong>{formatCount(inProgress)}</strong> commande
                          {inProgress > 1 ? "s" : ""} en cours · taux livraison <strong>{deliveryRate}%</strong>.
                        </>
                      ) : (
                        <>Pas de commande en production. Bonne fenêtre pour la qualité.</>
                      )}
                    </MaisonInsightCard>

                    {alertsCount > 0 || overdue > 0 ? (
                      <MaisonInsightCard title="Alertes">
                        {overdue > 0 ? (
                          <>
                            <strong>{formatCount(overdue)}</strong> en retard · retard moyen{" "}
                            <strong>{averageDelay.toFixed(1)} j</strong>.
                          </>
                        ) : (
                          <>
                            <strong>{formatCount(alertsCount)}</strong> alerte
                            {alertsCount > 1 ? "s" : ""} active
                            {alertsCount > 1 ? "s" : ""} dans la liste.
                          </>
                        )}
                      </MaisonInsightCard>
                    ) : (
                      <MaisonInsightCard title="Alertes">
                        Aucune alerte critique. Tableau dégagé pour la semaine.
                      </MaisonInsightCard>
                    )}

                    <MaisonInsightCard title="Volatilité métal">
                      Avant de figer un prix client, compare le coût matière courant aux{" "}
                      <strong>comparables Estate 24 mois</strong>.
                    </MaisonInsightCard>

                    <Link to="/ai-agent" className="dashboard-page__chat-cta">
                      Ouvrir le chat complet
                      <span aria-hidden>→</span>
                    </Link>
                  </>
                }
              />

              <div className="dashboard-page__metals">
                <MetalPricesWidget />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default DashboardPage;
