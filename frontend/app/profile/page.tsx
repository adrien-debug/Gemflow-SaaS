"use client";

import { Eyebrow, Title, Sub, Card } from "@/components/cockpit/primitives";
import { useState } from "react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.href = "/auth/login";
    }
  }

  return (
    <>
      <Eyebrow>Compte · Profil</Eyebrow>
      <Title>Profile</Title>
      <Sub>Informations du compte utilisateur</Sub>
      <Card title="À venir">
        <p>
          Page en construction. Endpoint backend attendu :{" "}
          <code>/api/v1/users/current</code>.
        </p>
      </Card>

      <div style={{ marginTop: "var(--ct-space-6, 24px)" }}>
        <button
          onClick={handleLogout}
          disabled={loading}
          style={{
            padding: "var(--ct-space-2, 8px) var(--ct-space-4, 16px)",
            borderRadius: "var(--ct-radius-md, 6px)",
            background: "rgba(220,50,50,0.12)",
            border: "1px solid rgba(220,50,50,0.3)",
            color: "var(--ct-status-error, #f87171)",
            fontWeight: 600,
            fontSize: "var(--ct-text-sm, 13px)",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Déconnexion…" : "Se déconnecter"}
        </button>
      </div>
    </>
  );
}
