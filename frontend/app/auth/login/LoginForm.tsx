"use client";

import { useState, FormEvent } from "react";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Email ou mot de passe incorrect",
  rate_limited: "Trop de tentatives, réessaie dans 1 min",
  supabase_not_configured: "Backend indisponible",
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const params = new URLSearchParams(window.location.search);
    const next = params.get("next") ?? "/";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password, next }),
      });

      const data = await res.json();

      if (!res.ok) {
        const code = data?.error ?? "invalid_credentials";
        setError(ERROR_MESSAGES[code] ?? ERROR_MESSAGES["invalid_credentials"]);
        return;
      }

      // Top-level navigation so the auth cookie is picked up by the browser
      window.location.href = data.redirect ?? "/";
    } catch {
      setError(ERROR_MESSAGES["supabase_not_configured"]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--ct-space-4, 16px)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ct-space-2, 8px)" }}>
        <label
          htmlFor="email"
          style={{
            fontSize: "var(--ct-text-sm, 13px)",
            color: "var(--ct-text-muted)",
            fontWeight: 500,
          }}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "var(--ct-space-2, 8px) var(--ct-space-3, 12px)",
            borderRadius: "var(--ct-radius-md, 6px)",
            border: "1px solid var(--ct-border)",
            background: "var(--ct-surface-raised, rgba(255,255,255,0.05))",
            color: "var(--ct-text)",
            fontSize: "var(--ct-text-sm, 13px)",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
          }}
          placeholder="vous@example.com"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--ct-space-2, 8px)" }}>
        <label
          htmlFor="password"
          style={{
            fontSize: "var(--ct-text-sm, 13px)",
            color: "var(--ct-text-muted)",
            fontWeight: 500,
          }}
        >
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "var(--ct-space-2, 8px) var(--ct-space-3, 12px)",
            borderRadius: "var(--ct-radius-md, 6px)",
            border: "1px solid var(--ct-border)",
            background: "var(--ct-surface-raised, rgba(255,255,255,0.05))",
            color: "var(--ct-text)",
            fontSize: "var(--ct-text-sm, 13px)",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
          }}
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p
          role="alert"
          style={{
            margin: 0,
            padding: "var(--ct-space-2, 8px) var(--ct-space-3, 12px)",
            borderRadius: "var(--ct-radius-md, 6px)",
            background: "rgba(220,50,50,0.12)",
            border: "1px solid rgba(220,50,50,0.3)",
            color: "var(--ct-status-error, #f87171)",
            fontSize: "var(--ct-text-sm, 13px)",
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "var(--ct-space-2, 10px) var(--ct-space-4, 16px)",
          borderRadius: "var(--ct-radius-md, 6px)",
          background: "var(--ct-accent-strong, #7c3aed)",
          color: "#fff",
          border: "none",
          fontWeight: 600,
          fontSize: "var(--ct-text-sm, 13px)",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "opacity 0.15s",
        }}
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
