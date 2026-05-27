"use client";

import { useEffect, useState } from "react";
import { Eyebrow, Title, Sub, Card, KpiGrid, KpiCard } from "@/components/cockpit/primitives";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ListResult =
  | { count: number; items: unknown[] }
  | { error: string }
  | null;

type ListsState = Record<string, ListResult>;

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

async function getAll(path: string): Promise<unknown[]> {
  const res = await fetch(`/api/backend/v1${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: unknown = await res.json();
  return Array.isArray(data) ? data : [];
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const REFS: Array<{ key: string; path: string; label: string }> = [
  { key: "metals",          path: "/metals",          label: "Métaux" },
  { key: "currencies",      path: "/currencies",      label: "Devises" },
  { key: "locations",       path: "/locations",       label: "Localisations" },
  { key: "collections",     path: "/collections",     label: "Collections" },
  { key: "item-categories", path: "/item-categories", label: "Catégories d'articles" },
  { key: "countries",       path: "/countries",       label: "Pays" },
  { key: "segments",        path: "/segments",        label: "Segments" },
  { key: "parameters",      path: "/parameters",      label: "Paramètres globaux" },
  { key: "diamond-shapes",  path: "/diamond-shapes",  label: "Formes de diamant" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractLabel(item: unknown): string {
  if (item && typeof item === "object") {
    const obj = item as Record<string, unknown>;
    if (typeof obj.name === "string") return obj.name;
    if (typeof obj.id !== "undefined") return String(obj.id);
  }
  return String(item);
}

function isOk(r: ListResult): r is { count: number; items: unknown[] } {
  return r !== null && !("error" in r);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SettingsPage() {
  const [lists, setLists] = useState<ListsState>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const results = await Promise.allSettled(REFS.map(({ path }) => getAll(path)));
      if (cancelled) return;
      const next: ListsState = {};
      results.forEach((result, i) => {
        const key = REFS[i].key;
        if (result.status === "fulfilled") {
          next[key] = { count: result.value.length, items: result.value };
        } else {
          const reason = result.reason;
          next[key] = {
            error: reason instanceof Error ? reason.message : "Erreur backend",
          };
        }
      });
      setLists(next);
      setLoading(false);
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  // KPI counts
  const okCount = Object.values(lists).filter(isOk).length;
  const metalsResult = lists["metals"];
  const currenciesResult = lists["currencies"];
  const countriesResult = lists["countries"];

  return (
    <>
      <Eyebrow>Système · Paramètres</Eyebrow>
      <Title>Settings</Title>
      <Sub>Référentiels du tenant Gemflow</Sub>

      {loading && (
        <p style={{ color: "var(--ct-muted)", marginTop: "1rem" }}>
          Chargement des référentiels…
        </p>
      )}

      {!loading && (
        <>
          <KpiGrid>
            <KpiCard
              label="Référentiels"
              value={`${okCount} / ${REFS.length}`}
              hint="chargés avec succès"
            />
            <KpiCard
              label="Métaux"
              value={isOk(metalsResult) ? String(metalsResult.count) : "—"}
            />
            <KpiCard
              label="Devises"
              value={isOk(currenciesResult) ? String(currenciesResult.count) : "—"}
            />
            <KpiCard
              label="Pays"
              value={isOk(countriesResult) ? String(countriesResult.count) : "—"}
            />
          </KpiGrid>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "var(--ct-spacing-4, 1rem)",
              marginTop: "var(--ct-spacing-4, 1rem)",
            }}
          >
            {REFS.map(({ key, label }) => {
              const result = lists[key] ?? null;

              if (result === null) {
                return (
                  <Card key={key} title={label}>
                    <p style={{ color: "var(--ct-muted)", fontSize: "0.875rem" }}>
                      Non chargé
                    </p>
                  </Card>
                );
              }

              if ("error" in result) {
                return (
                  <Card key={key} title={label}>
                    <p
                      style={{
                        color: "var(--ct-error)",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                    >
                      Erreur backend
                    </p>
                    <p
                      style={{
                        color: "var(--ct-muted)",
                        fontSize: "0.75rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {result.error}
                    </p>
                  </Card>
                );
              }

              const preview = result.items.slice(0, 5);

              return (
                <Card key={key} title={label}>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                      color: "var(--ct-fg, inherit)",
                    }}
                  >
                    {result.count} entrée{result.count !== 1 ? "s" : ""}
                  </p>
                  {preview.length > 0 && (
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                      }}
                    >
                      {preview.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: "0.8125rem",
                            color: "var(--ct-muted)",
                            padding: "0.125rem 0",
                            borderBottom:
                              idx < preview.length - 1
                                ? "1px solid var(--ct-border)"
                                : "none",
                          }}
                        >
                          {extractLabel(item)}
                        </li>
                      ))}
                      {result.count > 5 && (
                        <li
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--ct-muted)",
                            paddingTop: "0.25rem",
                            fontStyle: "italic",
                          }}
                        >
                          +{result.count - 5} de plus…
                        </li>
                      )}
                    </ul>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
