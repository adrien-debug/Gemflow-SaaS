"use client";

import { useEffect, useState } from "react";
import {
  Eyebrow,
  Title,
  Sub,
  Card,
  KpiGrid,
  KpiCard,
} from "@/components/cockpit/primitives";

// ── Local types ──────────────────────────────────────────────────────────────

type AlloyItem = {
  id: number;
  name?: string;
  metal?: { name: string };
  caratage?: { name: string };
  color?: string;
  pricePerGram?: number;
  totalWeight?: number;
  totalCost?: number;
  location?: { name: string };
};

type SR<T> = {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

// ── Helper ───────────────────────────────────────────────────────────────────

const PAGE_SIZE = 50;

async function postSearch(path: string, body: unknown): Promise<SR<AlloyItem>> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
  return res.json() as Promise<SR<AlloyItem>>;
}

// ── Formatters ────────────────────────────────────────────────────────────────

function fmtEur(n?: number): string {
  if (n == null) return "—";
  return n.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function fmtGram(n?: number, decimals = 3): string {
  if (n == null) return "—";
  return `${n.toFixed(decimals)}g`;
}

function fmtEurPerGram(n?: number): string {
  if (n == null) return "—";
  return `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €/g`;
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MetalsPage() {
  const [result, setResult] = useState<SR<AlloyItem> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  function doSearch(p: number, search: string) {
    setError(null);
    let cancelled = false;
    postSearch("/api/backend/v1/alloys/search", {
      page: p,
      size: PAGE_SIZE,
      sorts: [],
      searchCriteria: { searchInput: search || undefined },
    })
      .then((data) => { if (!cancelled) setResult(data); })
      .catch((e: Error) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setError(null);
      try {
        const data = await postSearch("/api/backend/v1/alloys/search", {
          page: 1,
          size: PAGE_SIZE,
          sorts: [],
          searchCriteria: {},
        });
        if (!cancelled) setResult(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erreur inconnue");
      }
    }

    void load();
    return () => { cancelled = true; };
   
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    doSearch(1, searchInput);
  }

  function handlePrev() {
    const p = page - 1;
    setPage(p);
    doSearch(p, searchInput);
  }

  function handleNext() {
    const p = page + 1;
    setPage(p);
    doSearch(p, searchInput);
  }

  const alloys = result?.content ?? null;
  const totalPages = result?.totalPages ?? 1;
  const totalElements = result?.totalElements ?? 0;

  const sumWeight =
    alloys && alloys.length > 0
      ? alloys.reduce((acc, a) => acc + (a.totalWeight ?? 0), 0)
      : null;
  const sumCost =
    alloys && alloys.length > 0
      ? alloys.reduce((acc, a) => acc + (a.totalCost ?? 0), 0)
      : null;

  return (
    <>
      <Eyebrow>Inventaire · Métaux</Eyebrow>
      <Title>Metals</Title>
      <Sub>Stock live</Sub>

      {/* KPI strip */}
      <KpiGrid>
        <KpiCard
          label="Total"
          value={totalElements.toLocaleString("fr-FR")}
          hint="alliages"
        />
        <KpiCard
          label="Poids total"
          value={sumWeight != null ? fmtGram(sumWeight) : "—"}
          hint="sur cette page"
        />
        <KpiCard
          label="Valeur"
          value={sumCost != null ? fmtEur(sumCost) : "—"}
          hint="sur cette page"
        />
      </KpiGrid>

      {/* Search */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "var(--ct-space-2)",
          margin: "var(--ct-space-4) 0",
        }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Nom, métal, caratage, couleur…"
          style={{
            flex: 1,
            padding: "var(--ct-space-2) var(--ct-space-3)",
            background: "var(--ct-surface-1)",
            border: "1px solid var(--ct-border)",
            borderRadius: "var(--ct-radius)",
            color: "var(--ct-text)",
            fontSize: "var(--ct-font-sm)",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "var(--ct-space-2) var(--ct-space-4)",
            background: "var(--ct-accent)",
            color: "var(--ct-text-on-accent)",
            border: "none",
            borderRadius: "var(--ct-radius)",
            fontSize: "var(--ct-font-sm)",
            cursor: "pointer",
          }}
        >
          Rechercher
        </button>
      </form>

      {/* Error */}
      {error && (
        <Card>
          <p
            style={{
              color: "var(--ct-status-danger)",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Erreur backend : {error}
          </p>
          <p
            style={{
              color: "var(--ct-text-muted)",
              fontSize: "var(--ct-font-sm)",
              marginTop: "var(--ct-space-1)",
            }}
          >
            Vérifiez que le service Maven tourne sur le port attendu.
          </p>
        </Card>
      )}

      {/* Loading */}
      {!result && !error && (
        <p style={{ color: "var(--ct-text-muted)" }}>Chargement…</p>
      )}

      {/* Empty */}
      {alloys && alloys.length === 0 && !error && (
        <p style={{ color: "var(--ct-text-muted)" }}>Aucun alliage.</p>
      )}

      {/* Table */}
      {alloys && alloys.length > 0 && (
        <Card>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "var(--ct-font-sm)",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--ct-border)",
                    textAlign: "left",
                  }}
                >
                  {[
                    "ID",
                    "Nom",
                    "Métal",
                    "Caratage",
                    "Couleur",
                    "Poids",
                    "€/g",
                    "Total €",
                    "Emplacement",
                  ].map((h) => (
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
                {alloys.map((a) => (
                  <tr
                    key={a.id}
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
                        fontFamily: "monospace",
                      }}
                    >
                      {a.id}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {a.name ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {a.metal?.name ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {a.caratage?.name ?? "—"}
                    </td>
                    <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>
                      {a.color ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmtGram(a.totalWeight, 3)}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmtEurPerGram(a.pricePerGram)}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmtEur(a.totalCost)}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        color: "var(--ct-text-muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {a.location?.name ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "var(--ct-space-3)",
              fontSize: "var(--ct-font-sm)",
              color: "var(--ct-text-muted)",
            }}
          >
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              style={{
                padding: "var(--ct-space-1) var(--ct-space-3)",
                background: "var(--ct-surface-1)",
                border: "1px solid var(--ct-border)",
                borderRadius: "var(--ct-radius)",
                color: "var(--ct-text)",
                fontSize: "var(--ct-font-sm)",
                cursor: page <= 1 ? "not-allowed" : "pointer",
                opacity: page <= 1 ? 0.4 : 1,
              }}
            >
              Précédent
            </button>
            <span>
              Page {page} / {totalPages} · {totalElements} alliages
            </span>
            <button
              onClick={handleNext}
              disabled={page >= totalPages}
              style={{
                padding: "var(--ct-space-1) var(--ct-space-3)",
                background: "var(--ct-surface-1)",
                border: "1px solid var(--ct-border)",
                borderRadius: "var(--ct-radius)",
                color: "var(--ct-text)",
                fontSize: "var(--ct-font-sm)",
                cursor: page >= totalPages ? "not-allowed" : "pointer",
                opacity: page >= totalPages ? 0.4 : 1,
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
