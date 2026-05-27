"use client";

import { useState, useEffect } from "react";
import { Eyebrow, Title, Sub, Card, KpiGrid, KpiCard } from "@/components/cockpit/primitives";
import { api } from "@/lib/api";
import type { OrderListItem, Priority, SearchResponse } from "@/lib/types";

// ─── Priority badge ────────────────────────────────────────────────────────────

const PRIORITY_STYLES: Record<Priority, { background: string; color: string; label: string }> = {
  LOW:  { background: "var(--ct-surface-2, rgba(255,255,255,0.06))", color: "var(--ct-text-muted)",  label: "LOW"  },
  NORM: { background: "var(--ct-surface-3, rgba(255,255,255,0.1))",  color: "var(--ct-text-body)",   label: "NORM" },
  HIGH: { background: "var(--ct-status-warning-bg)",                 color: "var(--ct-status-warning)", label: "HIGH" },
  TOP:  { background: "var(--ct-status-danger-bg)",                  color: "var(--ct-status-danger)",  label: "TOP"  },
};

function PriorityBadge({ value }: { value: Priority }) {
  const s = PRIORITY_STYLES[value] ?? PRIORITY_STYLES.NORM;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        background: s.background,
        color: s.color,
      }}
    >
      {s.label}
    </span>
  );
}

// ─── Date formatter ───────────────────────────────────────────────────────────

const fmtDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
  } catch {
    return iso;
  }
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrintingPage() {
  const [result, setResult] = useState<SearchResponse<OrderListItem> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await api.orders.search({ page: 1, size: 100, searchCriteria: { statuses: ["PROTOTYPING"] } });
        if (!cancelled) setResult(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erreur inconnue");
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  const isLoading = !result && !error;
  const items = result?.content ?? [];
  const totalElements = result?.totalElements ?? 0;
  const countTop  = items.filter((o) => o.priority === "TOP").length;
  const countHigh = items.filter((o) => o.priority === "HIGH").length;

  return (
    <>
      <Eyebrow>Production · Impression 3D</Eyebrow>
      <Title>3D Printing</Title>
      <Sub>Commandes en phase de prototypage</Sub>

      {/* KPI strip */}
      <KpiGrid>
        <KpiCard label="En prototype"   value={String(totalElements)} />
        <KpiCard label="Priorité TOP"   value={String(countTop)}  />
        <KpiCard label="Priorité HIGH"  value={String(countHigh)} />
      </KpiGrid>

      {/* Error state */}
      {error && (
        <Card>
          <div
            style={{
              background: "var(--ct-status-danger-bg)",
              border: "1px solid var(--ct-status-danger)",
              borderRadius: 8,
              padding: "14px 18px",
              color: "var(--ct-status-danger)",
            }}
          >
            <strong>Erreur backend :</strong> {error}
            <br />
            <span style={{ color: "var(--ct-text-muted)", fontSize: 13, marginTop: 4, display: "block" }}>
              Lance le backend Maven :{" "}
              <code style={{ fontFamily: "var(--mono, monospace)" }}>./mvnw spring-boot:run</code>
            </span>
          </div>
        </Card>
      )}

      {/* Loading state */}
      {isLoading && (
        <Card>
          <p style={{ color: "var(--ct-text-muted)" }}>Chargement…</p>
        </Card>
      )}

      {/* Empty state */}
      {result && items.length === 0 && (
        <Card>
          <p style={{ color: "var(--ct-text-muted)" }}>Aucune commande en prototypage.</p>
        </Card>
      )}

      {/* Queue table */}
      {result && items.length > 0 && (
        <Card title={`Queue impression (${items.length})`}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--ct-text-muted)", fontSize: 12, letterSpacing: "0.05em" }}>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>ID</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Nom</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Client</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Priorité</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Due</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Créé</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id} style={{ borderTop: "1px solid var(--ct-border-soft)" }}>
                  <td
                    style={{
                      padding: "8px 12px",
                      fontFamily: "var(--mono, monospace)",
                      fontSize: 12,
                      color: "var(--ct-text-muted)",
                    }}
                  >
                    {o.id}
                  </td>
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "var(--ct-text-body)" }}>
                    {o.name ?? "—"}
                  </td>
                  <td style={{ padding: "8px 12px", color: "var(--ct-text-body)" }}>
                    {o.client?.name ?? "—"}
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <PriorityBadge value={o.priority} />
                  </td>
                  <td style={{ padding: "8px 12px", fontSize: 13, color: "var(--ct-text-body)" }}>
                    {fmtDate(o.dueDate)}
                  </td>
                  <td style={{ padding: "8px 12px", fontSize: 13, color: "var(--ct-text-muted)" }}>
                    {fmtDate(o.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </>
  );
}
