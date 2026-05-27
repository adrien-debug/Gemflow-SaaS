"use client";

import { useEffect, useState } from "react";
import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";
import { api } from "@/lib/api";
import type { CrmContact, SearchResponse } from "@/lib/types";

const PAGE_SIZE = 50;

export default function CrmPage() {
  const [result, setResult] = useState<SearchResponse<CrmContact> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  function doSearch(p: number, search: string) {
    setError(null);
    let cancelled = false;
    api.crm.contacts
      .search({ page: p, size: PAGE_SIZE, searchCriteria: { search: search || undefined } })
      .then((data) => { if (!cancelled) setResult(data); })
      .catch((e: Error) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setError(null);
      try {
        const data = await api.crm.contacts.search({ page: 1, size: PAGE_SIZE, searchCriteria: {} });
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

  const contacts = result?.content ?? null;
  const totalPages = result?.totalPages ?? 1;
  const totalElements = result?.totalElements ?? 0;

  return (
    <>
      <Eyebrow>Relations · CRM</Eyebrow>
      <Title>Contacts</Title>
      <Sub>Annuaire CRM live</Sub>

      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "var(--ct-space-2)", marginBottom: "var(--ct-space-4)" }}
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Rechercher un contact…"
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
          <p style={{ color: "var(--ct-status-danger)" }}>
            Erreur backend : {error} · démarrer Spring Boot sur <code>:7001</code>.
          </p>
        </Card>
      )}

      {/* Loading */}
      {!result && !error && (
        <p style={{ color: "var(--ct-text-muted)" }}>Chargement…</p>
      )}

      {/* Empty state */}
      {contacts && contacts.length === 0 && !error && (
        <p style={{ color: "var(--ct-text-muted)" }}>Aucun contact.</p>
      )}

      {/* Table */}
      {contacts && contacts.length > 0 && (
        <Card>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "var(--ct-font-sm)",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--ct-border)", textAlign: "left" }}>
                {["ID", "Nom complet", "Email", "Téléphone", "Client", "Tags"].map((h) => (
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
              {contacts.map((c) => (
                <tr
                  key={c.id}
                  style={{ borderBottom: "1px solid var(--ct-border)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "var(--ct-surface-1)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLTableRowElement).style.background = "")
                  }
                >
                  <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)", color: "var(--ct-text-muted)" }}>
                    {c.id}
                  </td>
                  <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>
                    {(c.fullName ?? [c.firstName, c.lastName].filter(Boolean).join(" ")) || "—"}
                  </td>
                  <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>{c.email ?? "—"}</td>
                  <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>{c.phone ?? "—"}</td>
                  <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)" }}>{c.clientName ?? "—"}</td>
                  <td style={{ padding: "var(--ct-space-2) var(--ct-space-3)", color: "var(--ct-text-muted)" }}>
                    {c.tags ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
              Page {page} / {totalPages} · {totalElements} contacts
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
