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

type DiamondListItem = {
  id: number;
  referenceNumber?: string;
  shape?: { name: string };
  color?: string;
  clarity?: string;
  cutGrade?: string;
  carat?: number;
  pricePerCarat?: number;
  totalPrice?: number;
  location?: { name: string };
};

type SearchRes<T> = {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

// ── Helper ───────────────────────────────────────────────────────────────────

const PAGE_SIZE = 50;

async function searchDiamonds(
  page: number,
  size: number,
  searchInput?: string
): Promise<SearchRes<DiamondListItem>> {
  const res = await fetch("/api/backend/v1/diamonds/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      page,
      size,
      sorts: [],
      searchCriteria: {
        searchInput: searchInput || undefined,
      },
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);
  return res.json() as Promise<SearchRes<DiamondListItem>>;
}

// ── Formatters ────────────────────────────────────────────────────────────────

function fmtEur(n?: number): string {
  if (n == null) return "—";
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

function fmtCarat(n?: number, decimals = 3): string {
  if (n == null) return "—";
  return n.toFixed(decimals);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DiamondsPage() {
  const [result, setResult] = useState<SearchRes<DiamondListItem> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  function doSearch(p: number, search: string) {
    setError(null);
    let cancelled = false;
    searchDiamonds(p, PAGE_SIZE, search || undefined)
      .then((data) => { if (!cancelled) setResult(data); })
      .catch((e: Error) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setError(null);
      try {
        const data = await searchDiamonds(1, PAGE_SIZE, undefined);
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

  const diamonds = result?.content ?? null;
  const totalPages = result?.totalPages ?? 1;
  const totalElements = result?.totalElements ?? 0;

  // KPI computations on current page
  const sumCarats =
    diamonds && diamonds.length > 0
      ? diamonds.reduce((acc, d) => acc + (d.carat ?? 0), 0)
      : null;
  const sumValue =
    diamonds && diamonds.length > 0
      ? diamonds.reduce((acc, d) => acc + (d.totalPrice ?? 0), 0)
      : null;

  return (
    <>
      <Eyebrow>Inventaire · Pierres précieuses</Eyebrow>
      <Title>Diamants</Title>
      <Sub>Stock live</Sub>

      {/* KPI strip */}
      <KpiGrid>
        <KpiCard
          label="Total"
          value={totalElements.toLocaleString("fr-FR")}
          hint="diamants"
        />
        <KpiCard
          label="Carats"
          value={sumCarats != null ? sumCarats.toFixed(2) : "—"}
          hint="sur cette page"
        />
        <KpiCard
          label="Valeur"
          value={sumValue != null ? fmtEur(sumValue) : "—"}
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
          placeholder="Référence, forme, couleur…"
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
      {diamonds && diamonds.length === 0 && !error && (
        <p style={{ color: "var(--ct-text-muted)" }}>Aucun diamant.</p>
      )}

      {/* Table */}
      {diamonds && diamonds.length > 0 && (
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
                    "Ref",
                    "Shape",
                    "Couleur",
                    "Pureté",
                    "Coupe",
                    "Carats",
                    "€/ct",
                    "Total",
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
                {diamonds.map((d) => (
                  <tr
                    key={d.id}
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
                      {d.referenceNumber ?? `#${d.id}`}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.shape?.name ?? "—"}
                    </td>
                    <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>
                      {d.color ?? "—"}
                    </td>
                    <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>
                      {d.clarity ?? "—"}
                    </td>
                    <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>
                      {d.cutGrade ?? "—"}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmtCarat(d.carat, 3)}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmtEur(d.pricePerCarat)}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        fontFamily: "monospace",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {fmtEur(d.totalPrice)}
                    </td>
                    <td
                      style={{
                        padding: "var(--ct-space-2) var(--ct-space-3)",
                        color: "var(--ct-text-muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.location?.name ?? "—"}
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
              Page {page} / {totalPages} · {totalElements} diamants
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
