"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  Eyebrow,
  Title,
  Sub,
  KpiGrid,
  KpiCard,
} from "@/components/cockpit/primitives";

/* ─── Types ─────────────────────────────────────────────────── */

type GemstoneItem = {
  id: number;
  referenceNumber?: string;
  gem?: { name: string };
  color?: string;
  clarity?: string;
  weight?: number;
  pricePerCarat?: number;
  totalPrice?: number;
  location?: { name: string };
};

type SR<T> = {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

/* ─── Helper ─────────────────────────────────────────────────── */

async function postSearch(
  path: string,
  body: Record<string, unknown>
): Promise<SR<GemstoneItem>> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Backend error ${res.status}`);
  return res.json() as Promise<SR<GemstoneItem>>;
}

/* ─── Formatters ─────────────────────────────────────────────── */

const PAGE_SIZE = 20;

function fmtEur(n: number): string {
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

function fmtCt(n: number): string {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 3, maximumFractionDigits: 3 });
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function GemstonesPage() {
  const [result, setResult] = useState<SR<GemstoneItem> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [activeSearch, setActiveSearch] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!cancelled) setLoading(true);
      if (!cancelled) setError(null);

      const body: Record<string, unknown> = {
        page,
        size: PAGE_SIZE,
        sorts: [],
        searchCriteria: activeSearch ? { searchInput: activeSearch } : {},
      };

      try {
        const data = await postSearch("/api/backend/v1/gemstones/search", body);
        if (!cancelled) {
          setResult(data);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg);
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [page, activeSearch]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setPage(1);
    setActiveSearch(searchInput);
  }

  /* KPI computations on current page */
  const items = result?.content ?? [];
  const totalWeight = items.reduce((acc, g) => acc + (g.weight ?? 0), 0);
  const totalValue = items.reduce((acc, g) => acc + (g.totalPrice ?? 0), 0);

  return (
    <>
      <Eyebrow>Inventaire · Pierres précieuses</Eyebrow>
      <Title>Gemmes</Title>
      <Sub>Stock live</Sub>

      {/* KPI Strip */}
      <KpiGrid>
        <KpiCard
          label="Total"
          value={result ? result.totalElements.toLocaleString("fr-FR") : "—"}
          hint="gemmes"
        />
        <KpiCard
          label="Poids carats"
          value={items.length > 0 ? fmtCt(totalWeight) : "—"}
          hint="page courante"
        />
        <KpiCard
          label="Valeur"
          value={items.length > 0 ? fmtEur(totalValue) : "—"}
          hint="page courante"
        />
      </KpiGrid>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          gap: "var(--ct-space-sm, 8px)",
          margin: "var(--ct-space-md, 16px) 0",
        }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Rechercher une gemme…"
          className="ct-input"
          style={{
            flex: 1,
            padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)",
            background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
            border: "1px solid var(--ct-border)",
            borderRadius: "var(--ct-radius-sm, 6px)",
            color: "var(--ct-text)",
            fontSize: "0.875rem",
          }}
        />
        <button
          type="submit"
          className="ct-btn"
          style={{
            padding: "var(--ct-space-xs, 6px) var(--ct-space-md, 16px)",
            background: "var(--ct-accent-strong)",
            border: "none",
            borderRadius: "var(--ct-radius-sm, 6px)",
            color: "var(--ct-text-on-accent)",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          Rechercher
        </button>
      </form>

      {/* States */}
      {loading && (
        <p style={{ color: "var(--ct-text-muted)", fontSize: "0.875rem" }}>
          Chargement…
        </p>
      )}

      {!loading && error && (
        <div
          style={{
            padding: "var(--ct-space-md, 16px)",
            background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
            border: "1px solid var(--ct-color-error)",
            borderRadius: "var(--ct-radius-md, 8px)",
            color: "var(--ct-color-error)",
          }}
        >
          <strong>Erreur backend</strong> — {error}
          <br />
          <span style={{ fontSize: "0.8125rem", opacity: 0.8 }}>
            Vérifiez que le service Maven est démarré et accessible.
          </span>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p style={{ color: "var(--ct-text-muted)", fontSize: "0.875rem" }}>
          Aucune gemme trouvée.
        </p>
      )}

      {/* Table */}
      {!loading && !error && items.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.875rem",
              color: "var(--ct-text)",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--ct-border)",
                  textAlign: "left",
                  color: "var(--ct-text-muted)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {["Réf.", "Type", "Couleur", "Pureté", "Carats", "€/ct", "Total", "Emplacement"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{ padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)" }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((g, i) => (
                <tr
                  key={g.id}
                  style={{
                    borderBottom: "1px solid var(--ct-border)",
                    background:
                      i % 2 === 0
                        ? "transparent"
                        : "var(--ct-surface-1, rgba(255,255,255,0.02))",
                  }}
                >
                  <td style={{ padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)", fontFamily: "var(--ct-font-mono, monospace)", fontSize: "0.8125rem" }}>
                    {g.referenceNumber ?? "—"}
                  </td>
                  <td style={{ padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)" }}>
                    {g.gem?.name ?? "—"}
                  </td>
                  <td style={{ padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)" }}>
                    {g.color ?? "—"}
                  </td>
                  <td style={{ padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)" }}>
                    {g.clarity ?? "—"}
                  </td>
                  <td
                    style={{
                      padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)",
                      fontFamily: "var(--ct-font-mono, monospace)",
                      textAlign: "right",
                    }}
                  >
                    {g.weight != null ? fmtCt(g.weight) : "—"}
                  </td>
                  <td
                    style={{
                      padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)",
                      fontFamily: "var(--ct-font-mono, monospace)",
                      textAlign: "right",
                    }}
                  >
                    {g.pricePerCarat != null
                      ? g.pricePerCarat.toLocaleString("fr-FR", { maximumFractionDigits: 2 })
                      : "—"}
                  </td>
                  <td
                    style={{
                      padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)",
                      fontFamily: "var(--ct-font-mono, monospace)",
                      textAlign: "right",
                    }}
                  >
                    {g.totalPrice != null ? fmtEur(g.totalPrice) : "—"}
                  </td>
                  <td style={{ padding: "var(--ct-space-xs, 6px) var(--ct-space-sm, 8px)" }}>
                    {g.location?.name ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && result && result.totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--ct-space-sm, 8px)",
            marginTop: "var(--ct-space-md, 16px)",
            fontSize: "0.875rem",
            color: "var(--ct-text-muted)",
          }}
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            style={{
              padding: "var(--ct-space-xs, 4px) var(--ct-space-sm, 12px)",
              background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
              border: "1px solid var(--ct-border)",
              borderRadius: "var(--ct-radius-sm, 6px)",
              color: page <= 1 ? "var(--ct-text-disabled)" : "var(--ct-text)",
              cursor: page <= 1 ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
            }}
          >
            Précédent
          </button>

          <span>
            Page {page} / {result.totalPages} · {result.totalElements.toLocaleString("fr-FR")} gemmes
          </span>

          <button
            onClick={() => setPage((p) => Math.min(result.totalPages, p + 1))}
            disabled={page >= result.totalPages}
            style={{
              padding: "var(--ct-space-xs, 4px) var(--ct-space-sm, 12px)",
              background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
              border: "1px solid var(--ct-border)",
              borderRadius: "var(--ct-radius-sm, 6px)",
              color:
                page >= result.totalPages
                  ? "var(--ct-text-disabled)"
                  : "var(--ct-text)",
              cursor: page >= result.totalPages ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
            }}
          >
            Suivant
          </button>
        </div>
      )}
    </>
  );
}
