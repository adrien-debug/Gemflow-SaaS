"use client";

import { useEffect, useState } from "react";

const ACCENTS = [
  { id: "default", color: "#be123c", label: "Bordeaux" },
  { id: "hive", color: "#f59e0b", label: "Or" },
  { id: "halo", color: "#06b6d4", label: "Cyan" },
  { id: "hyper", color: "#a855f7", label: "Violet" },
  { id: "hustle", color: "#10b981", label: "Émeraude" },
];

const STORAGE_KEY = "cockpit:accent";

export function AccentSelector() {
  const [active, setActive] = useState<string>("default");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) ?? "default";
    setActive(saved);
    document.documentElement.setAttribute("data-product", saved);
  }, []);

  function pick(id: string) {
    setActive(id);
    localStorage.setItem(STORAGE_KEY, id);
    document.documentElement.setAttribute("data-product", id);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: "center",
        padding: "12px 0",
        borderTop: "1px solid var(--ct-border-soft)",
      }}
    >
      {ACCENTS.map((a) => (
        <button
          key={a.id}
          onClick={() => pick(a.id)}
          title={a.label}
          aria-label={`Accent ${a.label}`}
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            border: active === a.id ? "2px solid var(--ct-text-strong)" : "1px solid var(--ct-border)",
            background: a.color,
            cursor: "pointer",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}
