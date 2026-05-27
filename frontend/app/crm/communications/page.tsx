"use client";

import { useEffect, useState } from "react";
import { Eyebrow, Title, Sub, Card, KpiGrid, KpiCard } from "@/components/cockpit/primitives";
import { api } from "@/lib/api";
import type { CrmContact, SearchResponse } from "@/lib/types";

// ─── Local type ───────────────────────────────────────────────────────────────

type Communication = {
  id: number;
  type?: string;
  subject?: string;
  body?: string;
  contactId?: number;
  clientId?: number;
  createdAt?: string;
};

// ─── Helper ───────────────────────────────────────────────────────────────────

async function getComms(contactId: number): Promise<Communication[]> {
  const res = await fetch(`/api/backend/v1/crm/communications/by-contact/${contactId}`, {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? (data as Communication[]) : [];
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CrmCommunicationsPage() {
  const [comms, setComms] = useState<Communication[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [totalScanned, setTotalScanned] = useState<number>(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result: SearchResponse<CrmContact> = await api.crm.contacts.search({
          page: 1,
          size: 50,
        });

        const contacts = (result.content ?? []).slice(0, 10);
        if (!cancelled) setTotalScanned(contacts.length);

        const settled = await Promise.allSettled(
          contacts.map((c) => getComms(c.id)),
        );

        if (cancelled) return;

        const all: Communication[] = [];
        settled.forEach((r) => {
          if (r.status === "fulfilled") {
            all.push(...r.value);
          }
        });

        all.sort((a, b) => {
          const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return db - da;
        });

        setComms(all);
      } catch (e: unknown) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const distinctTypes = comms ? new Set(comms.map((c) => c.type).filter(Boolean)).size : 0;

  return (
    <>
      <Eyebrow>Relations · Communications</Eyebrow>
      <Title>CRM Communications</Title>
      <Sub>Échanges récents avec les contacts</Sub>

      {/* Error */}
      {error && (
        <Card>
          <p style={{ color: "var(--ct-status-danger)" }}>
            Erreur backend : {error} · démarrer Maven / Spring Boot sur{" "}
            <code>:7001</code>.
          </p>
        </Card>
      )}

      {/* Loading */}
      {!comms && !error && (
        <p style={{ color: "var(--ct-text-muted)" }}>Chargement…</p>
      )}

      {/* KPIs */}
      {comms && (
        <KpiGrid>
          <KpiCard
            label="Total comms"
            value={String(comms.length)}
            hint="communications"
          />
          <KpiCard
            label="Contacts scannés"
            value={String(totalScanned)}
            hint="contacts analysés"
          />
          <KpiCard
            label="Types distincts"
            value={String(distinctTypes)}
            hint="catégories"
          />
        </KpiGrid>
      )}

      {/* Empty state */}
      {comms && comms.length === 0 && !error && (
        <p style={{ color: "var(--ct-text-muted)", marginTop: "var(--ct-space-4)" }}>
          Aucune communication trouvée.
        </p>
      )}

      {/* Table */}
      {comms && comms.length > 0 && (
        <Card title={`Historique (${comms.length})`}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "var(--ct-font-sm)",
            }}
          >
            <thead>
              <tr
                style={{ borderBottom: "1px solid var(--ct-border)", textAlign: "left" }}
              >
                {["Date", "Type", "Sujet", "Aperçu", "Contact"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "var(--ct-space-2) var(--ct-space-3)",
                      color: "var(--ct-text-muted)",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comms.map((c) => (
                <tr
                  key={c.id}
                  style={{ borderBottom: "1px solid var(--ct-border)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background =
                      "var(--ct-surface-1)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "")
                  }
                >
                  <td
                    style={{
                      padding: "var(--ct-space-2) var(--ct-space-3)",
                      color: "var(--ct-text-muted)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleString("fr-FR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })
                      : "—"}
                  </td>
                  <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>
                    {c.type ? (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: "var(--ct-radius)",
                          background: "var(--ct-surface-1)",
                          border: "1px solid var(--ct-border)",
                          fontSize: "0.75em",
                          fontWeight: 500,
                          color: "var(--ct-accent)",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {c.type}
                      </span>
                    ) : (
                      <span style={{ color: "var(--ct-text-muted)" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>
                    {c.subject ?? "—"}
                  </td>
                  <td
                    style={{
                      padding: "var(--ct-space-2) var(--ct-space-3)",
                      color: "var(--ct-text-muted)",
                      maxWidth: 260,
                    }}
                  >
                    {c.body ? c.body.slice(0, 80) + (c.body.length > 80 ? "…" : "") : "—"}
                  </td>
                  <td
                    style={{
                      padding: "var(--ct-space-2) var(--ct-space-3)",
                      color: "var(--ct-text-muted)",
                    }}
                  >
                    {c.contactId ?? "—"}
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
