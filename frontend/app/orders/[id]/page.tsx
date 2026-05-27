"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Eyebrow,
  Title,
  Sub,
  Card,
  KpiGrid,
  KpiCard,
} from "@/components/cockpit/primitives";
import type { Priority, OrderStatus, ClientShort, Segment, ItemCategory, Collection, Image } from "@/lib/types";

// ─── Local types ──────────────────────────────────────────────────────────────

interface OrderDto {
  id: number;
  name?: string;
  priority: Priority;
  dueDate: string;
  status: OrderStatus;
  createdAt: string;
  client?: ClientShort;
  segment?: Segment;
  itemCategory?: ItemCategory;
  collection?: Collection;
  productImages?: Image[];
  note?: string;
  description?: string;
  weightTarget?: number;
  tasks?: unknown;
  labours?: unknown;
}

interface TaskSummaryItem {
  label?: string;
  name?: string;
  status?: string;
  count?: number;
}

interface OrderTaskSummary {
  tasks?: TaskSummaryItem[];
  totalCount?: number;
  completedCount?: number;
  [key: string]: unknown;
}

interface LabourSummaryItem {
  post?: string;
  taskType?: string;
  totalMinutes?: number;
  totalSeconds?: number;
  [key: string]: unknown;
}

interface OrderLabourSummary {
  items?: LabourSummaryItem[];
  totalMinutes?: number;
  totalSeconds?: number;
  [key: string]: unknown;
}

interface MetalTotalItem {
  metalName?: string;
  name?: string;
  weightIn?: number;
  weightOut?: number;
  cost?: number;
  [key: string]: unknown;
}

interface OrderMetalTotalDto {
  metals?: MetalTotalItem[];
  totalWeightIn?: number;
  totalWeightOut?: number;
  totalCost?: number;
  [key: string]: unknown;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtDate = (iso?: string) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const fmtWeight = (g?: number) => (g != null ? `${g.toFixed(2)} g` : "—");
const fmtCost = (c?: number) => (c != null ? `${c.toFixed(2)} €` : "—");
const fmtHours = (min?: number, sec?: number) => {
  const total = min != null ? min : sec != null ? Math.round(sec / 60) : null;
  if (total == null) return "—";
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h${m.toString().padStart(2, "0")}` : `${m}min`;
};

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

const TABLE_LABEL_STYLE: React.CSSProperties = {
  padding: "8px 12px",
  color: "var(--ct-text-muted)",
  fontSize: 13,
  fontWeight: 500,
  whiteSpace: "nowrap",
  width: "30%",
};

const TABLE_VALUE_STYLE: React.CSSProperties = {
  padding: "8px 12px",
  color: "var(--ct-text-body)",
  fontSize: 13,
};

function KvRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <tr style={{ borderTop: "1px solid var(--ct-border-soft)" }}>
      <td style={TABLE_LABEL_STYLE}>{label}</td>
      <td style={TABLE_VALUE_STYLE}>{value ?? "—"}</td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [order, setOrder] = useState<OrderDto | null>(null);
  const [tasks, setTasks] = useState<OrderTaskSummary | null>(null);
  const [labours, setLabours] = useState<OrderLabourSummary | null>(null);
  const [metals, setMetals] = useState<OrderMetalTotalDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const base = `/api/backend/v1/orders/${id}`;
      const headers = { accept: "application/json" };

      try {
        const [orderRes, tasksRes, laboursRes, metalsRes] = await Promise.allSettled([
          fetch(base, { headers, cache: "no-store" }),
          fetch(`${base}/tasks/summary`, { headers, cache: "no-store" }),
          fetch(`${base}/labours/summary`, { headers, cache: "no-store" }),
          fetch(`${base}/metal-totals`, { headers, cache: "no-store" }),
        ]);

        if (cancelled) return;

        // order is mandatory
        if (orderRes.status === "fulfilled" && orderRes.value.ok) {
          const data = (await orderRes.value.json()) as OrderDto;
          if (!cancelled) setOrder(data);
        } else if (orderRes.status === "fulfilled" && orderRes.value.status === 404) {
          if (!cancelled) setError("Commande introuvable (404).");
        } else if (orderRes.status === "fulfilled") {
          if (!cancelled) setError(`Erreur serveur : ${orderRes.value.status}`);
        } else {
          if (!cancelled) setError("Impossible de joindre le backend.");
        }

        // tasks — optional
        if (tasksRes.status === "fulfilled" && tasksRes.value.ok) {
          const data = (await tasksRes.value.json()) as OrderTaskSummary;
          if (!cancelled) setTasks(data);
        }

        // labours — optional
        if (laboursRes.status === "fulfilled" && laboursRes.value.ok) {
          const data = (await laboursRes.value.json()) as OrderLabourSummary;
          if (!cancelled) setLabours(data);
        }

        // metals — optional
        if (metalsRes.status === "fulfilled" && metalsRes.value.ok) {
          const data = (await metalsRes.value.json()) as OrderMetalTotalDto;
          if (!cancelled) setMetals(data);
        }
      } catch {
        if (!cancelled) setError("Erreur réseau inattendue.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => { cancelled = true; };
  }, [id]);

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <Eyebrow>Commande #{id}</Eyebrow>
        <Title>Chargement…</Title>
        <Card>
          <p style={{ color: "var(--ct-text-muted)" }}>Récupération des données…</p>
        </Card>
      </>
    );
  }

  // ── Error / 404 ─────────────────────────────────────────────────────────────
  if (error || !order) {
    return (
      <>
        <Eyebrow>Commande #{id}</Eyebrow>
        <Title>Commande</Title>
        <Link
          href="/orders"
          style={{
            display: "inline-block",
            marginBottom: 16,
            color: "var(--ct-text-muted)",
            textDecoration: "underline",
            fontSize: 13,
          }}
        >
          ← Retour aux commandes
        </Link>
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
            {error ?? "Commande introuvable."}
          </div>
        </Card>
      </>
    );
  }

  // ── Task count ──────────────────────────────────────────────────────────────
  const taskCount =
    tasks?.totalCount != null
      ? String(tasks.totalCount)
      : tasks?.tasks != null
        ? String(tasks.tasks.length)
        : "—";

  // ── Labour total ────────────────────────────────────────────────────────────
  const labourHours = fmtHours(labours?.totalMinutes, labours?.totalSeconds);

  return (
    <>
      {/* Back link */}
      <Link
        href="/orders"
        style={{
          display: "inline-block",
          marginBottom: 12,
          color: "var(--ct-text-muted)",
          textDecoration: "underline",
          fontSize: 13,
        }}
      >
        ← Retour aux commandes
      </Link>

      {/* Header */}
      <Eyebrow>Commande #{id}</Eyebrow>
      <Title>{order.name ?? "Commande"}</Title>
      <Sub>
        {[order.client?.name, order.status?.replace(/_/g, " ")].filter(Boolean).join(" · ")}
      </Sub>

      {/* KPI strip */}
      <KpiGrid>
        <KpiCard
          label="Priorité"
          value={order.priority}
        />
        <KpiCard
          label="Échéance"
          value={fmtDate(order.dueDate)}
        />
        <KpiCard
          label="Tâches"
          value={taskCount}
        />
        <KpiCard
          label="Labour"
          value={labourHours}
        />
      </KpiGrid>

      {/* Priority badge standalone (shown below kpi for clarity) */}
      <div style={{ marginBottom: 24, marginTop: 4 }}>
        <PriorityBadge value={order.priority} />
      </div>

      {/* Card: Informations */}
      <Card title="Informations">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <KvRow label="Catégorie" value={order.itemCategory?.name} />
            <KvRow label="Segment" value={order.segment?.name} />
            <KvRow label="Collection" value={order.collection?.name} />
            <KvRow label="Créé" value={fmtDate(order.createdAt)} />
            <KvRow label="Échéance" value={fmtDate(order.dueDate)} />
            <KvRow label="Statut" value={order.status?.replace(/_/g, " ")} />
            {order.note && <KvRow label="Note" value={order.note} />}
            {order.description && <KvRow label="Description" value={order.description} />}
            {order.weightTarget != null && (
              <KvRow label="Poids cible" value={fmtWeight(order.weightTarget)} />
            )}
          </tbody>
        </table>
      </Card>

      {/* Card: Métaux */}
      {metals && (
        <Card title="Métaux">
          {metals.metals && metals.metals.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "var(--ct-text-muted)", fontSize: 12, letterSpacing: "0.04em" }}>
                  <th style={{ padding: "6px 12px", fontWeight: 600, textAlign: "left" }}>Métal</th>
                  <th style={{ padding: "6px 12px", fontWeight: 600, textAlign: "right" }}>Poids in</th>
                  <th style={{ padding: "6px 12px", fontWeight: 600, textAlign: "right" }}>Poids out</th>
                  <th style={{ padding: "6px 12px", fontWeight: 600, textAlign: "right" }}>Coût</th>
                </tr>
              </thead>
              <tbody>
                {metals.metals.map((m, i) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--ct-border-soft)" }}>
                    <td style={{ padding: "7px 12px", fontSize: 13, color: "var(--ct-text-body)" }}>
                      {m.metalName ?? m.name ?? "—"}
                    </td>
                    <td style={{ padding: "7px 12px", fontSize: 13, color: "var(--ct-text-body)", textAlign: "right" }}>
                      {fmtWeight(m.weightIn)}
                    </td>
                    <td style={{ padding: "7px 12px", fontSize: 13, color: "var(--ct-text-body)", textAlign: "right" }}>
                      {fmtWeight(m.weightOut)}
                    </td>
                    <td style={{ padding: "7px 12px", fontSize: 13, color: "var(--ct-text-body)", textAlign: "right" }}>
                      {fmtCost(m.cost)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "2px solid var(--ct-border-soft)", color: "var(--ct-text-muted)", fontSize: 12 }}>
                  <td style={{ padding: "6px 12px", fontWeight: 600 }}>Total</td>
                  <td style={{ padding: "6px 12px", textAlign: "right" }}>{fmtWeight(metals.totalWeightIn)}</td>
                  <td style={{ padding: "6px 12px", textAlign: "right" }}>{fmtWeight(metals.totalWeightOut)}</td>
                  <td style={{ padding: "6px 12px", textAlign: "right" }}>{fmtCost(metals.totalCost)}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p style={{ color: "var(--ct-text-muted)", fontSize: 13 }}>
              {fmtWeight(metals.totalWeightIn)} in · {fmtWeight(metals.totalWeightOut)} out · {fmtCost(metals.totalCost)}
            </p>
          )}
        </Card>
      )}

      {/* Card: Tâches */}
      {tasks && (
        <Card title="Tâches">
          {tasks.tasks && tasks.tasks.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {tasks.tasks.map((t, i) => (
                  <tr key={i} style={{ borderTop: i === 0 ? "none" : "1px solid var(--ct-border-soft)" }}>
                    <td style={{ padding: "7px 12px", fontSize: 13, color: "var(--ct-text-body)" }}>
                      {t.label ?? t.name ?? `Tâche ${i + 1}`}
                    </td>
                    <td style={{ padding: "7px 12px", fontSize: 12, color: "var(--ct-text-muted)", textAlign: "right" }}>
                      {t.status ?? (t.count != null ? `${t.count}` : "")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "var(--ct-text-muted)", fontSize: 13 }}>
              {taskCount !== "—" ? `${taskCount} tâche${Number(taskCount) !== 1 ? "s" : ""}` : "Aucune tâche."}
            </p>
          )}
        </Card>
      )}

      {/* Card: Labour */}
      {labours && (
        <Card title="Labour">
          {labours.items && labours.items.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "var(--ct-text-muted)", fontSize: 12, letterSpacing: "0.04em" }}>
                  <th style={{ padding: "6px 12px", fontWeight: 600, textAlign: "left" }}>Poste</th>
                  <th style={{ padding: "6px 12px", fontWeight: 600, textAlign: "right" }}>Temps</th>
                </tr>
              </thead>
              <tbody>
                {labours.items.map((l, i) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--ct-border-soft)" }}>
                    <td style={{ padding: "7px 12px", fontSize: 13, color: "var(--ct-text-body)" }}>
                      {l.post ?? l.taskType ?? `Poste ${i + 1}`}
                    </td>
                    <td style={{ padding: "7px 12px", fontSize: 13, color: "var(--ct-text-body)", textAlign: "right" }}>
                      {fmtHours(l.totalMinutes, l.totalSeconds)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: "2px solid var(--ct-border-soft)", color: "var(--ct-text-muted)", fontSize: 12 }}>
                  <td style={{ padding: "6px 12px", fontWeight: 600 }}>Total</td>
                  <td style={{ padding: "6px 12px", textAlign: "right" }}>{fmtHours(labours.totalMinutes, labours.totalSeconds)}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p style={{ color: "var(--ct-text-muted)", fontSize: 13 }}>
              Total : {labourHours}
            </p>
          )}
        </Card>
      )}
    </>
  );
}
