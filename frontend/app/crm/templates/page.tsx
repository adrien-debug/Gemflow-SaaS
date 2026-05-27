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

type EmailTemplate = {
  id: number;
  name?: string;
  subject?: string;
  body?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
};

async function getTemplates(): Promise<EmailTemplate[]> {
  const res = await fetch("/api/backend/v1/crm/templates");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function CrmTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getTemplates();
        if (!cancelled) setTemplates(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erreur inconnue");
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  const totalTemplates = templates?.length ?? 0;
  const distinctCategories = templates
    ? new Set(templates.map((t) => t.category).filter(Boolean)).size
    : 0;

  function toggleExpand(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <Eyebrow>Relations · Templates</Eyebrow>
      <Title>Email Templates</Title>
      <Sub>Modèles de communication</Sub>

      <KpiGrid>
        <KpiCard
          label="Total templates"
          value={templates === null ? "—" : String(totalTemplates)}
        />
        <KpiCard
          label="Catégories distinctes"
          value={templates === null ? "—" : String(distinctCategories)}
        />
      </KpiGrid>

      {/* Error */}
      {error && (
        <Card>
          <p style={{ color: "var(--ct-status-danger)" }}>
            Erreur backend : {error} · démarrer Maven sur <code>:7001</code>.
          </p>
        </Card>
      )}

      {/* Loading */}
      {!templates && !error && (
        <p style={{ color: "var(--ct-text-muted)" }}>Chargement…</p>
      )}

      {/* Empty */}
      {templates && templates.length === 0 && !error && (
        <p style={{ color: "var(--ct-text-muted)" }}>Aucun template.</p>
      )}

      {/* List */}
      {templates && templates.length > 0 && (
        <Card title={`Templates (${totalTemplates})`}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--ct-space-3)" }}>
            {templates.map((t) => {
              const isExpanded = expandedId === t.id;
              return (
                <div
                  key={t.id}
                  style={{
                    border: "1px solid var(--ct-border)",
                    borderRadius: "var(--ct-radius)",
                    overflow: "hidden",
                  }}
                >
                  {/* Header row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "var(--ct-space-2) var(--ct-space-3)",
                      background: "var(--ct-surface-1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--ct-space-2)",
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "var(--ct-font-sm)",
                          fontWeight: 500,
                          color: "var(--ct-text)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {t.name ?? `Template #${t.id}`}
                      </span>
                      {t.category && (
                        <span
                          style={{
                            fontSize: "var(--ct-font-xs, 0.75rem)",
                            padding: "2px var(--ct-space-2)",
                            borderRadius: "9999px",
                            background: "var(--ct-accent)",
                            color: "var(--ct-text-on-accent)",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {t.category}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleExpand(t.id)}
                      style={{
                        flexShrink: 0,
                        marginLeft: "var(--ct-space-3)",
                        padding: "var(--ct-space-1) var(--ct-space-3)",
                        background: isExpanded ? "var(--ct-accent)" : "var(--ct-surface-2, var(--ct-surface-1))",
                        color: isExpanded ? "var(--ct-text-on-accent)" : "var(--ct-text)",
                        border: "1px solid var(--ct-border)",
                        borderRadius: "var(--ct-radius)",
                        fontSize: "var(--ct-font-sm)",
                        cursor: "pointer",
                      }}
                    >
                      {isExpanded ? "Fermer" : "Voir"}
                    </button>
                  </div>

                  {/* Expanded body */}
                  {isExpanded && (
                    <div style={{ padding: "var(--ct-space-3)" }}>
                      {t.subject && (
                        <p
                          style={{
                            fontSize: "var(--ct-font-sm)",
                            color: "var(--ct-text-muted)",
                            marginBottom: "var(--ct-space-2)",
                          }}
                        >
                          <strong>Sujet :</strong> {t.subject}
                        </p>
                      )}
                      <pre
                        style={{
                          background: "var(--ct-surface-2, var(--ct-surface-1))",
                          padding: "var(--ct-space-3)",
                          borderRadius: "var(--ct-radius)",
                          fontFamily: "monospace",
                          fontSize: "var(--ct-font-xs, 0.75rem)",
                          color: "var(--ct-text)",
                          maxHeight: "300px",
                          overflowY: "auto",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          margin: 0,
                        }}
                      >
                        {t.body ?? "(corps vide)"}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );
}
