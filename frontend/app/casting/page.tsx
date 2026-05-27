"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Eyebrow,
  Title,
  Sub,
  Card,
  KpiGrid,
  KpiCard,
} from "@/components/cockpit/primitives";

// ─── Types ────────────────────────────────────────────────────────────────────

type CastingItem = {
  id: number;
  name?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  metal?: { name: string };
  weightIn?: number;
  weightOut?: number;
  cost?: number;
};

type SR<T> = {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

// ─── API helper ───────────────────────────────────────────────────────────────

async function postSearch(
  page: number,
  size: number,
  searchInput?: string,
): Promise<SR<CastingItem>> {
  const body = JSON.stringify({
    page,
    size,
    sorts: [],
    searchCriteria: searchInput ? { searchInput } : {},
  });
  const headers = { "Content-Type": "application/json" };

  // Try plural first, then singular fallback
  const paths = [
    "/api/backend/v1/castings/search",
    "/api/backend/v1/casting/search",
  ] as const;

  let lastStatus = 0;
  for (const path of paths) {
    const res = await fetch(path, { method: "POST", headers, body });
    lastStatus = res.status;
    if (res.ok) {
      return res.json() as Promise<SR<CastingItem>>;
    }
    if (res.status !== 404) {
      const text = await res.text().catch(() => res.statusText);
      throw new Error(`${res.status} ${text}`);
    }
  }
  throw new Error(`Les deux endpoints ont retourné 404 (dernier: ${lastStatus})`);
}

// ─── Formatters ───────────────────────────────────────────────────────────────

const fmtDate = (iso?: string): string => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const fmtWeight = (v?: number): string =>
  v == null ? "—" : `${v.toFixed(3)}g`;

const fmtCost = (v?: number): string =>
  v == null
    ? "—"
    : `${v.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;

const sumField = (items: CastingItem[], key: "weightIn" | "weightOut" | "cost"): number =>
  items.reduce((acc, item) => acc + (item[key] ?? 0), 0);

// ─── StatusBadge ─────────────────────────────────────────────────────────────

function StatusBadge({ value }: { value?: string }) {
  if (!value) return <span style={{ color: "var(--ct-text-muted)" }}>—</span>;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 500,
        background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
        color: "var(--ct-text-muted)",
        letterSpacing: "0.03em",
      }}
    >
      {value.replace(/_/g, " ")}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 50;

export default function CastingPage() {
  const [result, setResult] = useState<SR<CastingItem> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const doSearch = useCallback(async (p: number, q: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await postSearch(p, PAGE_SIZE, q || undefined);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await postSearch(1, PAGE_SIZE, undefined);
        if (!cancelled) setResult(res);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Erreur inconnue");
          setResult(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => { cancelled = true; };
   
  }, []);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      void doSearch(1, searchInput);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput, doSearch]);

  const goTo = (p: number) => {
    setPage(p);
    doSearch(p, searchInput);
  };

  const items = result?.content ?? [];
  const totalSessions = result?.totalElements ?? 0;
  const totalWeightIn = sumField(items, "weightIn");
  const totalWeightOut = sumField(items, "weightOut");
  const totalCost = sumField(items, "cost");

  return (
    <>
      <Eyebrow>Production · Fonderie</Eyebrow>
      <Title>Casting</Title>
      <Sub>Sessions de coulée live</Sub>

      {/* KPI strip */}
      <KpiGrid>
        <KpiCard
          label="Total sessions"
          value={totalSessions.toLocaleString("fr-FR")}
          hint="sessions"
        />
        <KpiCard
          label="Métal entrant"
          value={loading ? "…" : fmtWeight(totalWeightIn)}
          hint="sum page courante"
        />
        <KpiCard
          label="Métal sortant"
          value={loading ? "…" : fmtWeight(totalWeightOut)}
          hint="sum page courante"
        />
        <KpiCard
          label="Coût total"
          value={loading ? "…" : fmtCost(totalCost)}
          hint="sum page courante"
        />
      </KpiGrid>

      {/* Search bar */}
      <div style={{ marginBottom: 16, marginTop: 20, display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPage(1);
              doSearch(1, searchInput);
            }
          }}
          placeholder="Rechercher une session de coulée…"
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "8px 14px",
            borderRadius: 6,
            border: "1px solid var(--ct-border-soft)",
            background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
            color: "var(--ct-text-body)",
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          onClick={() => { setPage(1); doSearch(1, searchInput); }}
          style={{
            padding: "8px 18px",
            borderRadius: 6,
            border: "1px solid var(--ct-border-soft)",
            background: "var(--ct-accent-strong)",
            color: "var(--ct-text-on-accent)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Rechercher
        </button>
      </div>

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
            <span
              style={{
                color: "var(--ct-text-muted)",
                fontSize: 13,
                marginTop: 4,
                display: "block",
              }}
            >
              Lance le backend Maven :{" "}
              <code style={{ fontFamily: "var(--mono, monospace)" }}>
                ./mvnw spring-boot:run
              </code>
            </span>
          </div>
        </Card>
      )}

      {/* Loading state */}
      {loading && !error && (
        <Card>
          <p style={{ color: "var(--ct-text-muted)" }}>Chargement des sessions de coulée…</p>
        </Card>
      )}

      {/* Empty state */}
      {!loading && !error && result && items.length === 0 && (
        <Card>
          <p style={{ color: "var(--ct-text-muted)" }}>Aucune session de coulée trouvée.</p>
        </Card>
      )}

      {/* Table */}
      {!loading && !error && items.length > 0 && (
        <Card>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    textAlign: "left",
                    color: "var(--ct-text-muted)",
                    fontSize: 12,
                    letterSpacing: "0.05em",
                  }}
                >
                  <th style={{ padding: "8px 12px", fontWeight: 600 }}>ID</th>
                  <th style={{ padding: "8px 12px", fontWeight: 600 }}>Nom</th>
                  <th style={{ padding: "8px 12px", fontWeight: 600 }}>Métal</th>
                  <th style={{ padding: "8px 12px", fontWeight: 600 }}>Statut</th>
                  <th style={{ padding: "8px 12px", fontWeight: 600 }}>Date début</th>
                  <th style={{ padding: "8px 12px", fontWeight: 600 }}>Date fin</th>
                  <th style={{ padding: "8px 12px", fontWeight: 600, textAlign: "right" }}>
                    Poids in
                  </th>
                  <th style={{ padding: "8px 12px", fontWeight: 600, textAlign: "right" }}>
                    Poids out
                  </th>
                  <th style={{ padding: "8px 12px", fontWeight: 600, textAlign: "right" }}>
                    Coût
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    style={{ borderTop: "1px solid var(--ct-border-soft)" }}
                  >
                    <td
                      style={{
                        padding: "8px 12px",
                        fontFamily: "var(--mono, monospace)",
                        fontSize: 12,
                        color: "var(--ct-text-muted)",
                      }}
                    >
                      {item.id}
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        fontWeight: 500,
                        color: "var(--ct-text-body)",
                      }}
                    >
                      {item.name ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        color: "var(--ct-text-body)",
                        fontSize: 13,
                      }}
                    >
                      {item.metal?.name ?? "—"}
                    </td>
                    <td style={{ padding: "8px 12px" }}>
                      <StatusBadge value={item.status} />
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        fontSize: 13,
                        color: "var(--ct-text-body)",
                      }}
                    >
                      {fmtDate(item.startDate)}
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        fontSize: 13,
                        color: "var(--ct-text-muted)",
                      }}
                    >
                      {fmtDate(item.endDate)}
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        textAlign: "right",
                        fontFamily: "var(--mono, monospace)",
                        fontSize: 12,
                        color: "var(--ct-text-body)",
                      }}
                    >
                      {fmtWeight(item.weightIn)}
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        textAlign: "right",
                        fontFamily: "var(--mono, monospace)",
                        fontSize: 12,
                        color: "var(--ct-text-body)",
                      }}
                    >
                      {fmtWeight(item.weightOut)}
                    </td>
                    <td
                      style={{
                        padding: "8px 12px",
                        textAlign: "right",
                        fontFamily: "var(--mono, monospace)",
                        fontSize: 12,
                        color: "var(--ct-text-body)",
                      }}
                    >
                      {fmtCost(item.cost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {result && result.totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 16,
                paddingTop: 12,
                borderTop: "1px solid var(--ct-border-soft)",
                fontSize: 13,
                color: "var(--ct-text-muted)",
              }}
            >
              <button
                onClick={() => goTo(page - 1)}
                disabled={page <= 1}
                style={{
                  padding: "5px 14px",
                  borderRadius: 5,
                  border: "1px solid var(--ct-border-soft)",
                  background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
                  color: page <= 1 ? "var(--ct-text-muted)" : "var(--ct-text-body)",
                  cursor: page <= 1 ? "not-allowed" : "pointer",
                  opacity: page <= 1 ? 0.4 : 1,
                  fontSize: 13,
                }}
              >
                Précédent
              </button>

              <span>
                Page{" "}
                <strong style={{ color: "var(--ct-text-body)" }}>{result.page}</strong> /{" "}
                <strong style={{ color: "var(--ct-text-body)" }}>{result.totalPages}</strong>
                {" · "}
                <strong style={{ color: "var(--ct-text-body)" }}>{result.totalElements}</strong>{" "}
                résultats
              </span>

              <button
                onClick={() => goTo(page + 1)}
                disabled={page >= result.totalPages}
                style={{
                  padding: "5px 14px",
                  borderRadius: 5,
                  border: "1px solid var(--ct-border-soft)",
                  background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
                  color:
                    page >= result.totalPages
                      ? "var(--ct-text-muted)"
                      : "var(--ct-text-body)",
                  cursor: page >= result.totalPages ? "not-allowed" : "pointer",
                  opacity: page >= result.totalPages ? 0.4 : 1,
                  fontSize: 13,
                }}
              >
                Suivant
              </button>
            </div>
          )}
        </Card>
      )}
    </>
  );
}
