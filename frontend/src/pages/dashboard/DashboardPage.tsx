import { FC } from "react";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useDashboardStats } from "@entities/dashboard";

const DashboardPage: FC = () => {
  const { data: stats } = useDashboardStats();

  const inProgress = stats?.ordersInProgress ?? 0;
  const alerts = stats?.alerts ?? [];
  const overdueCount = alerts.filter((a) => a.alertType === "OVERDUE").length;
  const atRiskCount = alerts.filter((a) => a.alertType === "AT_RISK").length;
  const ordersByStatus = stats?.ordersByStatus ?? [];

  return (
    <CommonLayout>
      <h1>Dashboard</h1>

      <p>Commandes en cours : {inProgress}</p>
      <p>En retard : {overdueCount}</p>
      <p>À risque : {atRiskCount}</p>

      <h2>Commandes par statut</h2>
      <ul>
        {ordersByStatus.map(({ status, count }) => (
          <li key={status}>
            {status} : {count}
          </li>
        ))}
      </ul>

      <h2>Alertes</h2>
      {alerts.length === 0 ? (
        <p>Aucune alerte.</p>
      ) : (
        <ul>
          {alerts.map((a, i) => (
            <li key={i}>
              [{a.alertType}] {a.message}
            </li>
          ))}
        </ul>
      )}
    </CommonLayout>
  );
};

export default DashboardPage;
