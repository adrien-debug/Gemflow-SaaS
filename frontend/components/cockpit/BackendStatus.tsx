"use client";

import { useEffect, useState } from "react";

export function BackendStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/backend/v1/dashboard/stats", { cache: "no-store" })
      .then((r) => {
        if (cancelled) return;
        setStatus(r.ok ? "online" : "offline");
      })
      .catch(() => !cancelled && setStatus("offline"));
    return () => {
      cancelled = true;
    };
  }, []);

  const color =
    status === "online" ? "var(--ct-accent-strong)" : status === "offline" ? "rgba(255,80,80,0.9)" : "var(--ct-text-muted)";
  const label = status === "online" ? "Backend OK" : status === "offline" ? "Backend OFF" : "…";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        color: "var(--ct-text-muted)",
        fontFamily: "var(--mono, monospace)",
      }}
    >
      <span
        aria-hidden
        style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }}
      />
      {label} <span style={{ opacity: 0.6 }}>· :7001</span>
    </span>
  );
}
