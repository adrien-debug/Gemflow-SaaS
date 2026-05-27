"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";
import { api } from "@/lib/api";
import type { OrderListItem, OrderStatus, Priority, SearchResponse } from "@/lib/types";

// ─── Priority badge ────────────────────────────────────────────────────────────

const PRIORITY_STYLES: Record<Priority, { background: string; color: string; label: string }> = {
  LOW: { background: "var(--ct-surface-2, rgba(255,255,255,0.06))", color: "var(--ct-text-muted)", label: "LOW" },
  NORM: { background: "var(--ct-surface-3, rgba(255,255,255,0.1))", color: "var(--ct-text-body)", label: "NORM" },
  HIGH: { background: "var(--ct-status-warning-bg)", color: "var(--ct-status-warning)", label: "HIGH" },
  TOP: { background: "var(--ct-status-danger-bg)", color: "var(--ct-status-danger)", label: "TOP" },
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

function StatusBadge({ value }: { value: OrderStatus }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 500,
        background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
        color: "var(--ct-text-body)",
        letterSpacing: "0.03em",
      }}
    >
      {value.replace(/_/g, " ")}
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

function OrdersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showNewPanel = searchParams.get("new") === "1";

  const [result, setResult] = useState<SearchResponse<OrderListItem> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const doSearch = useCallback(
    async (currentPage: number, input: string) => {
      setError(null);
      try {
        const res = await api.orders.search({
          page: currentPage,
          size: 50,
          searchCriteria: { searchInput: input || undefined },
        });
        setResult(res);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur inconnue");
        setResult(null);
      }
    },
    [],
  );

  // Initial load
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await api.orders.search({ page: 1, size: 50, searchCriteria: {} });
        if (!cancelled) setResult(res);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Erreur inconnue");
          setResult(null);
        }
      }
    }

    void load();
    return () => { cancelled = true; };
   
  }, []);

  // Debounce search input (400 ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      void doSearch(1, searchInput);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput, doSearch]);

  // Pagination
  const goTo = (p: number) => {
    setPage(p);
    doSearch(p, searchInput);
  };

  const isLoading = !result && !error;
  const count = result?.totalElements ?? 0;

  return (
    <>
      <Eyebrow>Atelier · Commandes</Eyebrow>
      <Title>Orders</Title>
      <Sub>{result !== null ? `${count} commande${count !== 1 ? "s" : ""} vivantes côté backend` : "Chargement des commandes…"}</Sub>

      {/* New order panel */}
      {showNewPanel && (
        <div
          style={{
            marginBottom: "var(--ct-space-4)",
            padding: "var(--ct-space-4)",
            background: "var(--ct-surface-2)",
            border: "1px solid var(--ct-border-soft)",
            borderRadius: "var(--ct-radius)",
            color: "var(--ct-text-body)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--ct-space-2)" }}>
            <strong style={{ fontSize: 15 }}>Nouvelle commande</strong>
            <button
              onClick={() => router.replace("/orders")}
              style={{
                padding: "4px 14px",
                background: "var(--ct-accent)",
                color: "var(--ct-text-on-accent, #fff)",
                border: "none",
                borderRadius: "var(--ct-radius)",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Fermer
            </button>
          </div>
          <p style={{ margin: 0, fontSize: 14 }}>
            Formulaire de création à câbler sur{" "}
            <code style={{ fontFamily: "var(--mono, monospace)" }}>POST /api/v1/orders</code>{" "}
            (OrderCompositeService.createOrder).
          </p>
        </div>
      )}

      {/* Search bar */}
      <div style={{ marginBottom: 16, marginTop: 8 }}>
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
          placeholder="Rechercher une commande…"
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
            <span style={{ color: "var(--ct-text-muted)", fontSize: 13, marginTop: 4, display: "block" }}>
              Lance le backend Maven : <code style={{ fontFamily: "var(--mono, monospace)" }}>./mvnw spring-boot:run</code>
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
      {result && result.content.length === 0 && (
        <Card>
          <p style={{ color: "var(--ct-text-muted)" }}>Aucune commande.</p>
        </Card>
      )}

      {/* Table */}
      {result && result.content.length > 0 && (
        <Card>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", color: "var(--ct-text-muted)", fontSize: 12, letterSpacing: "0.05em" }}>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>ID</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Nom</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Client</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Catégorie</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Priorité</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Statut</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Due</th>
                <th style={{ padding: "8px 12px", fontWeight: 600 }}>Créé</th>
              </tr>
            </thead>
            <tbody>
              {result.content.map((o) => (
                <tr key={o.id} style={{ borderTop: "1px solid var(--ct-border-soft)" }}>
                  <td style={{ padding: "8px 12px", fontFamily: "var(--mono, monospace)", fontSize: 12, color: "var(--ct-text-muted)" }}>
                    {o.id}
                  </td>
                  <td style={{ padding: "8px 12px", fontWeight: 500, color: "var(--ct-text-body)" }}>{o.name ?? "—"}</td>
                  <td style={{ padding: "8px 12px", color: "var(--ct-text-body)" }}>{o.client?.name ?? "—"}</td>
                  <td style={{ padding: "8px 12px", color: "var(--ct-text-muted)", fontSize: 13 }}>{o.itemCategory?.name ?? "—"}</td>
                  <td style={{ padding: "8px 12px" }}>
                    <PriorityBadge value={o.priority} />
                  </td>
                  <td style={{ padding: "8px 12px" }}>
                    <StatusBadge value={o.status} />
                  </td>
                  <td style={{ padding: "8px 12px", fontSize: 13, color: "var(--ct-text-body)" }}>{fmtDate(o.dueDate)}</td>
                  <td style={{ padding: "8px 12px", fontSize: 13, color: "var(--ct-text-muted)" }}>{fmtDate(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
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
              Page <strong style={{ color: "var(--ct-text-body)" }}>{result.page}</strong> /{" "}
              <strong style={{ color: "var(--ct-text-body)" }}>{result.totalPages}</strong>
              {" · "}
              <strong style={{ color: "var(--ct-text-body)" }}>{result.totalElements}</strong> résultats
            </span>

            <button
              onClick={() => goTo(page + 1)}
              disabled={page >= result.totalPages}
              style={{
                padding: "5px 14px",
                borderRadius: 5,
                border: "1px solid var(--ct-border-soft)",
                background: "var(--ct-surface-2, rgba(255,255,255,0.06))",
                color: page >= result.totalPages ? "var(--ct-text-muted)" : "var(--ct-text-body)",
                cursor: page >= result.totalPages ? "not-allowed" : "pointer",
                opacity: page >= result.totalPages ? 0.4 : 1,
                fontSize: 13,
              }}
            >
              Suivant
            </button>
          </div>
        </Card>
      )}
    </>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={null}>
      <OrdersContent />
    </Suspense>
  );
}
