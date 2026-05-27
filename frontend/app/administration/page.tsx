"use client";

import { useEffect, useState } from "react";
import { Eyebrow, Title, Sub, Card, KpiGrid, KpiCard } from "@/components/cockpit/primitives";
import { api } from "@/lib/api";
import type { User, Role, Permission, SearchResponse } from "@/lib/types";

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [usersRes, rolesRes, permissionsRes] = await Promise.all([
          api.users.search({ page: 1, size: 100 }),
          api.roles.list(),
          api.permissions.list(),
        ]) as [SearchResponse<User>, Role[], Permission[]];
        if (!cancelled) {
          setUsers(usersRes.content);
          setRoles(rolesRes);
          setPermissions(permissionsRes);
        }
      } catch (err: unknown) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  // Group permissions by category
  const permissionsByCategory = permissions.reduce<Map<string, Permission[]>>((map, perm) => {
    const list = map.get(perm.category) ?? [];
    list.push(perm);
    map.set(perm.category, list);
    return map;
  }, new Map());

  const activeUsers = users.filter((u) => u.isActive);

  return (
    <>
      <Eyebrow>Système · Administration</Eyebrow>
      <Title>Administration</Title>
      <Sub>Utilisateurs, rôles et permissions du tenant.</Sub>

      {loading && (
        <p style={{ color: "var(--ct-muted)", marginTop: "1rem" }}>Chargement…</p>
      )}

      {error && (
        <Card title="Erreur">
          <p style={{ color: "var(--ct-error)" }}>{error}</p>
          <p style={{ color: "var(--ct-muted)", fontSize: "0.875rem", marginTop: "0.5rem" }}>
            Vérifiez que le backend Maven est démarré et accessible.
          </p>
        </Card>
      )}

      {!loading && !error && (
        <>
          <KpiGrid>
            <KpiCard label="Utilisateurs" value={String(users.length)} />
            <KpiCard label="Actifs" value={String(activeUsers.length)} />
            <KpiCard label="Rôles" value={String(roles.length)} />
            <KpiCard label="Permissions" value={String(permissions.length)} />
          </KpiGrid>

          {/* Users table */}
          <Card title={`Utilisateurs (${users.length})`}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid var(--ct-border)" }}>
                  <th style={{ padding: "0.5rem 0.75rem" }}>ID</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Nom</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Email</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Rôle</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid var(--ct-border)" }}>
                    <td style={{ padding: "0.5rem 0.75rem", color: "var(--ct-muted)" }}>{u.id}</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>
                      {u.fullName ?? ([u.firstName, u.lastName].filter(Boolean).join(" ") || "—")}
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>{u.email}</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>{u.role?.name ?? "—"}</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.125rem 0.5rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          background: u.isActive ? "var(--ct-success-bg)" : "var(--ct-muted-bg)",
                          color: u.isActive ? "var(--ct-success)" : "var(--ct-muted)",
                        }}
                      >
                        {u.isActive ? "Actif" : "Inactif"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Roles table */}
          <Card title={`Rôles (${roles.length})`}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid var(--ct-border)" }}>
                  <th style={{ padding: "0.5rem 0.75rem" }}>ID</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Code</th>
                  <th style={{ padding: "0.5rem 0.75rem" }}>Nom</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid var(--ct-border)" }}>
                    <td style={{ padding: "0.5rem 0.75rem", color: "var(--ct-muted)" }}>{r.id}</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>
                      <code style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>{r.code}</code>
                    </td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>{r.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* Permissions grouped by category */}
          <Card title={`Permissions (${permissions.length})`}>
            {Array.from(permissionsByCategory.entries()).map(([category, perms]) => (
              <div key={category} style={{ marginBottom: "1.25rem" }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ct-muted)",
                    marginBottom: "0.5rem",
                    borderBottom: "1px solid var(--ct-border)",
                    paddingBottom: "0.25rem",
                  }}
                >
                  {category} ({perms.length})
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <tbody>
                    {perms.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid var(--ct-border)" }}>
                        <td style={{ padding: "0.375rem 0.75rem", width: "40%" }}>
                          <code style={{ fontFamily: "monospace", fontSize: "0.8125rem" }}>{p.code}</code>
                        </td>
                        <td style={{ padding: "0.375rem 0.75rem" }}>{p.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </Card>
        </>
      )}
    </>
  );
}
