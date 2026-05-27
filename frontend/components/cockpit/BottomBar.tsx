"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SHORTCUTS = [
  { href: "/", label: "Dashboard" },
  { href: "/orders", label: "Orders" },
  { href: "/casting", label: "Casting" },
  { href: "/stock", label: "Stock" },
  { href: "/crm", label: "CRM" },
];

export function BottomBar() {
  const pathname = usePathname();

  return (
    <div className="ct-bottom-bar">
      <div className="ct-bottom-bar-inner">
        <span className="ct-bottom-label">Gemflow</span>

        <div className="ct-seg-track">
          {SHORTCUTS.map((r) => {
            const active =
              r.href === "/"
                ? pathname === "/"
                : pathname === r.href || pathname.startsWith(r.href + "/");
            return (
              <Link
                key={r.href}
                href={r.href}
                className={`ct-seg-btn${active ? " active" : ""}`}
              >
                {r.label}
              </Link>
            );
          })}
        </div>

        <div className="ct-seg-track">
          <Link href="/orders?new=1" className="ct-seg-btn primary">
            Nouvelle commande
          </Link>
          <button
            className="ct-seg-btn"
            onClick={() => alert("Command palette à venir")}
          >
            ⌘K
          </button>
        </div>
      </div>
    </div>
  );
}
