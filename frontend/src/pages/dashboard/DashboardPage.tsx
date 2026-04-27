import { FC } from "react";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useDashboardStats } from "@entities/dashboard";
import { AlertsBoard } from "@features/dashboard/alerts-board";
import { StatusDistributionChart } from "@features/dashboard/status-chart";
import { PriorityChart } from "@features/dashboard/priority-chart";
import { MorningBriefing } from "@features/dashboard/morning-briefing";
import {
  MaisonAiBanner,
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
  const invoiced = stats?.ordersInvoiced ?? 0;
  const overdue = stats?.ordersOverdue ?? 0;
  const deliveryRate = totalOrders > 0 ? Math.round((finished / totalOrders) * 100) : 0;

  const kpis: MaisonKpi[] = [
    { label: "Commandes Actives", value: formatCount(inProgress) },
    { label: "Total Commandes", value: formatCount(totalOrders) },
    {
      label: "En Retard",
      value: formatCount(overdue),
      tone: overdue > 0 ? "danger" : "default",
    },
    { label: "Facturées", value: formatCount(invoiced) },
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
          <header className="dashboard-page__hero">
            <MaisonPageHeader
              eyebrow="Atelier Intelligence · v5.0 · Place Vendôme"
              title="Carnet"
              emphasized="d'Atelier"
              coordinates={{ lat: "48.8675", lon: "2.3287" }}
            />
            <MaisonKpiStrip items={kpis} />
            {overdue === 0 ? (
              <MaisonAiBanner
                title="Atelier fluide"
                body={
                  <>
                    Aucun retard significatif. Profite de la fenêtre pour interroger l'agent sur les{" "}
                    <em>opportunités de pricing</em>.
                  </>
                }
              />
            ) : null}
          </header>

          <section className="dashboard-page__row dashboard-page__row--ops" aria-label="Pulse opérationnel">
            <AlertsBoard alerts={stats?.alerts} loading={isLoading} />
            <MorningBriefing />
          </section>

          <section className="dashboard-page__row dashboard-page__row--analytics" aria-label="Analyse pipeline">
            <StatusDistributionChart ordersByStatus={stats?.ordersByStatus} loading={isLoading} />
            <PriorityChart ordersByPriority={stats?.ordersByPriority} loading={isLoading} />
          </section>
        </div>
      </div>
    </CommonLayout>
  );
};

export default DashboardPage;
