import { FC, useMemo } from "react";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useDashboardStats } from "@entities/dashboard";
import { OrdersBoard, type OrdersBoardRow } from "@features/dashboard/orders-board";
import { DashboardAside, type DashboardAsideInsight } from "@features/dashboard/dashboard-aside";
import {
  MaisonAiBanner,
  MaisonKpiStrip,
  MaisonPageHeader,
  type MaisonKpi,
} from "@features/agents/maison";
import "./styles.scss";

const formatPortfolio = (n: number) => {
  if (n >= 1_000_000) {
    const millions = n / 1_000_000;
    return millions.toFixed(1).replace(".", ",");
  }
  if (n >= 1_000) {
    return `${Math.round(n / 1_000)}k`;
  }
  return n.toString();
};

const padTwo = (n: number) => n.toString().padStart(2, "0");

const previewOrders: OrdersBoardRow[] = [
  {
    id: 1147,
    initial: "J",
    thumbVariant: "pearl",
    pieceSignature: "Joséphine",
    pieceName: "Tiare",
    collection: "Maison Chaumet",
    material: "Pt 950",
    status: "Sertissage",
    statusTone: "setting",
    artisan: "Sophie Levi",
    estimatedValue: 1240800,
    currency: "EUR",
  },
  {
    id: 1148,
    initial: "P",
    thumbVariant: "gold",
    pieceSignature: "Persian",
    pieceName: "Lily Brooch",
    collection: "Al Thani Collection",
    material: "Au 18k",
    status: "Casting",
    statusTone: "casting",
    artisan: "Marc Bouchard",
    estimatedValue: 482100,
    currency: "EUR",
  },
];

const DashboardPage: FC = () => {
  const { data: stats } = useDashboardStats();

  const totalOrders = stats?.totalOrders ?? 0;
  const inProgress = stats?.ordersInProgress ?? 0;
  const finished = stats?.ordersFinished ?? 0;
  const invoiced = stats?.ordersInvoiced ?? 0;
  const overdue = stats?.ordersOverdue ?? 0;

  const portfolioValueEur = useMemo(
    () => previewOrders.reduce((sum, row) => sum + row.estimatedValue, 0) + (totalOrders - previewOrders.length) * 320000,
    [totalOrders],
  );

  const qualityRate = useMemo(() => {
    const completed = finished + invoiced;
    const denominator = totalOrders > 0 ? totalOrders : completed;
    if (denominator === 0) return 98.2;
    return Math.min(99.9, (completed / denominator) * 100);
  }, [finished, invoiced, totalOrders]);

  const kpis: MaisonKpi[] = [
    {
      label: "Commandes Actives",
      value: inProgress > 0 ? inProgress : totalOrders,
    },
    {
      label: "Valeur Portfolio",
      value: formatPortfolio(portfolioValueEur),
      unit: "€",
      unitPosition: "before",
    },
    {
      label: "Risques Détectés",
      value: padTwo(overdue),
      tone: overdue > 0 ? "danger" : "default",
    },
    {
      label: "Contrôle Qualité",
      value: qualityRate.toFixed(1).replace(".", ","),
      unit: "%",
      unitPosition: "after",
      tone: qualityRate >= 95 ? "success" : "default",
    },
  ];

  const insights: DashboardAsideInsight[] = [
    {
      eyebrow: "Optimisation casting",
      body: (
        <>
          Le groupage des commandes <strong>ATL-1147</strong> et <strong>ATL-1148</strong> permet d'économiser
          18% du temps de four.
        </>
      ),
    },
    {
      eyebrow: "Alerte stock diamants",
      body: (
        <>
          Stock critique sur 0,5ct DEF/VVS pour la production de demain. Suggestion : commande{" "}
          <em>Maison Heller</em>.
        </>
      ),
    },
  ];

  return (
    <CommonLayout>
      <div className="dashboard-page">
        <div className="dashboard-page__grid">
          <div className="dashboard-page__main">
            <MaisonPageHeader
              eyebrow="Production Intelligence · v5.0 · Place Vendôme"
              title="Carnet d'"
              emphasized="Atelier"
              coordinates={{ lat: "48.8675", lon: "2.3287" }}
            />

            <MaisonKpiStrip items={kpis} />

            <MaisonAiBanner
              title="Optimisation de production détectée"
              body={
                <>
                  Le groupage des commandes <em>Joséphine</em> et <em>Persian Lily</em> libère 1.2 jours de four.
                </>
              }
              ctaLabel="Appliquer Plan"
            />

            <OrdersBoard rows={previewOrders} total={totalOrders} pageSize={7} selectedId={1147} />
          </div>

          <DashboardAside insights={insights} />
        </div>
      </div>
    </CommonLayout>
  );
};

export default DashboardPage;
