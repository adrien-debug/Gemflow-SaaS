"use client";

import { useEffect, useState } from "react";
import { Eyebrow, Title, Sub, Card, KpiGrid, KpiCard } from "@/components/cockpit/primitives";
import { BackendStatus } from "@/components/cockpit/BackendStatus";
import StatusDonut from "@/components/cockpit/StatusDonut";
import AlertsList from "@/components/cockpit/AlertsList";
import { api } from "@/lib/api";
import type { DashboardStats } from "@/lib/types";

export default function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const data = await api.dashboard.stats();
        if (!cancelled) setStats(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erreur inconnue");
      }
    }

    void fetchStats();
    const interval = setInterval(() => { void fetchStats(); }, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const fmt = (n: number | undefined) => (typeof n === "number" ? String(n) : "—");
  const atRisk = stats?.alerts?.filter((a) => a.alertType === "AT_RISK").length ?? 0;

  return (
    <>
      <Eyebrow>Cockpit · Gemflow</Eyebrow>
      <Title>Atelier Intelligence</Title>
      <Sub>
        Données live depuis Spring Boot. <BackendStatus />
      </Sub>

      <KpiGrid>
        <KpiCard label="Total" value={fmt(stats?.totalOrders)} hint="commandes" />
        <KpiCard label="En cours" value={fmt(stats?.ordersInProgress)} hint="actives" />
        <KpiCard label="Terminées" value={fmt(stats?.ordersFinished)} hint="à facturer" />
        <KpiCard label="Facturées" value={fmt(stats?.ordersInvoiced)} hint="clos" />
        <KpiCard label="En retard" value={fmt(stats?.ordersOverdue)} hint="OVERDUE" />
        <KpiCard label="À risque" value={fmt(atRisk)} hint="AT_RISK" />
      </KpiGrid>

      {error && (
        <Card title="Backend indisponible">
          <p style={{ color: "var(--ct-status-danger)" }}>
            Impossible de joindre <code>/api/backend/v1/dashboard/stats</code>. {error}
          </p>
          <p style={{ marginTop: 8, color: "var(--ct-text-muted)" }}>
            Lance le backend Maven : <code>cd .. && ./mvnw spring-boot:run</code>
          </p>
        </Card>
      )}

      <Card title="Statuts">
        <StatusDonut statuses={stats?.ordersByStatus ?? []} />
      </Card>

      <Card title={`Alertes (${stats?.alerts?.length ?? 0})`}>
        <AlertsList alerts={stats?.alerts ?? []} />
      </Card>

      <Sub>
        Retard moyen : <strong>{stats?.averageDelayDays?.toFixed(1) ?? "—"}</strong> jours
      </Sub>
    </>
  );
}
