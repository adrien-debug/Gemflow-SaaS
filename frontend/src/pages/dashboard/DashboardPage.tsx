import { FC } from "react";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useDashboardStats } from "@entities/dashboard";
import { DashboardAside } from "@features/dashboard/dashboard-aside";
import { VerdictHero } from "@features/dashboard/verdict-hero";
import { DecisionMetalCard, DecisionWorkshopCard, DecisionRelationsCard } from "@features/dashboard/decision-cards";
import "./styles.scss";

const DashboardPage: FC = () => {
  const { data: stats } = useDashboardStats();

  const inProgress = stats?.ordersInProgress ?? 0;
  const alerts = stats?.alerts ?? [];
  const ordersByStatus = stats?.ordersByStatus?.reduce(
    (acc, { status, count }) => {
      acc[status] = count;
      return acc;
    },
    {} as Record<string, number>,
  ) ?? {};

  return (
    <CommonLayout>
      <div className="dashboard-page">
        <div className="dashboard-page__grid">
          <div className="dashboard-page__main">
            <VerdictHero ordersInProgress={inProgress} alerts={alerts} ordersByStatus={ordersByStatus} />

            <div className="dashboard-page__decisions">
              <DecisionMetalCard />
              <DecisionWorkshopCard ordersByStatus={ordersByStatus} />
              <DecisionRelationsCard alerts={alerts} />
            </div>

            <div className="dashboard-page__footer">
              <p className="dashboard-page__footer-text">
                <strong>{Math.max(0, (stats?.totalOrders ?? 0) - inProgress)}</strong> commandes saines.{" "}
                <a href="/orders">Voir le détail.</a>
              </p>
            </div>
          </div>

          <DashboardAside insights={[]} />
        </div>
      </div>
    </CommonLayout>
  );
};

export default DashboardPage;
