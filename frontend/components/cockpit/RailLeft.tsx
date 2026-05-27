"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { HearstLogo } from "./HearstLogo";
import { AccentSelector } from "./AccentSelector";

// ── Icons ──────────────────────────────────────────────────────────────────────

function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function IconDesktop() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function IconCube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconBeaker() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M9 3v8l-4 9h14L15 11V3" />
    </svg>
  );
}

function IconFlame() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function IconDatabase() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function IconBoxes() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
      <path d="m7 16.5-4.74-2.85" />
      <path d="m7 16.5 5-3" />
      <path d="M7 16.5v5.17" />
      <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
      <path d="m17 16.5-5-3" />
      <path d="m17 16.5 4.74-2.85" />
      <path d="M17 16.5v5.17" />
      <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
      <path d="M12 8 7.26 5.15" />
      <path d="m12 8 4.74-2.85" />
      <path d="M12 13.5V8" />
    </svg>
  );
}

function IconDiamond() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </svg>
  );
}

function IconGem() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
      <polyline points="11 3 8 9 12 22 16 9 13 3" />
      <line x1="2" y1="9" x2="22" y2="9" />
    </svg>
  );
}

function IconCoin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="7" x2="12" y2="17" />
      <path d="M9 10a3 3 0 0 1 6 0c0 1.5-1 2.5-3 4-2-1.5-3-2.5-3-4Z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconRobot() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="9" cy="16" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="16" r="1" fill="currentColor" stroke="none" />
      <path d="M12 7V3" />
      <circle cx="12" cy="7" r="2" />
      <path d="M7 11V8" />
      <path d="M17 11V8" />
    </svg>
  );
}

function IconCog() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// ── Nav types ──────────────────────────────────────────────────────────────────

type NavItem = { href: string; label: string; icon: React.ReactNode };
type NavGroup = { id: string; label: string; icon: React.ReactNode; children: NavItem[] };
type NavEntry = NavItem | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return "id" in entry;
}

// ── Nav data ───────────────────────────────────────────────────────────────────

const TOP_NAV: NavEntry[] = [
  { href: "/", label: "Dashboard", icon: <IconDashboard /> },
  { href: "/orders", label: "Orders", icon: <IconCart /> },
  {
    id: "preprod",
    label: "Pre-Production",
    icon: <IconDesktop />,
    children: [
      { href: "/cad", label: "CAD", icon: <IconCube /> },
      { href: "/3d-printing", label: "3D Printing", icon: <IconLayers /> },
      { href: "/pre-casting", label: "Pre casting", icon: <IconBeaker /> },
    ],
  },
  { href: "/casting", label: "Casting", icon: <IconFlame /> },
  { href: "/stock", label: "Stock", icon: <IconDatabase /> },
  {
    id: "inventory",
    label: "Inventory",
    icon: <IconBoxes />,
    children: [
      { href: "/diamonds", label: "Diamonds", icon: <IconDiamond /> },
      { href: "/gemstones", label: "Gemstones", icon: <IconGem /> },
      { href: "/metals", label: "Metals", icon: <IconCoin /> },
    ],
  },
];

const BOTTOM_NAV: NavEntry[] = [
  { href: "/crm", label: "CRM", icon: <IconUsers /> },
  { href: "/administration", label: "Administration", icon: <IconShield /> },
  { href: "/ai-agent", label: "AI Agent", icon: <IconRobot /> },
  { href: "/settings", label: "Settings", icon: <IconCog /> },
  { href: "/permissions", label: "Permissions", icon: <IconLock /> },
  { href: "/profile", label: "Profile", icon: <IconUser /> },
];

// ── Active helpers ─────────────────────────────────────────────────────────────

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function groupHasActiveChild(pathname: string, group: NavGroup): boolean {
  return group.children.some((c) => isActive(pathname, c.href));
}

// ── Component ──────────────────────────────────────────────────────────────────

export function RailLeft() {
  const pathname = usePathname();

  // manualOverrides tracks groups the user has explicitly toggled.
  // true = forced open, false = forced closed.
  const [manualOverrides, setManualOverrides] = useState<Record<string, boolean>>({});

  // Derive the final expanded set: auto-open any group containing the active
  // route, then apply manual overrides on top. A manual "false" (user closed
  // the auto-opened group) wins over the auto-open.
  const expanded = useMemo<Set<string>>(() => {
    const result = new Set<string>();
    for (const entry of [...TOP_NAV, ...BOTTOM_NAV]) {
      if (!isGroup(entry)) continue;
      const id = entry.id;
      if (id in manualOverrides) {
        if (manualOverrides[id]) result.add(id);
      } else if (groupHasActiveChild(pathname, entry)) {
        result.add(id);
      }
    }
    return result;
  }, [pathname, manualOverrides]);

  function toggleGroup(id: string) {
    setManualOverrides((prev) => ({ ...prev, [id]: !expanded.has(id) }));
  }

  function renderEntry(entry: NavEntry) {
    if (!isGroup(entry)) {
      return (
        <Link
          key={entry.href}
          href={entry.href}
          className={`ct-rail-action${isActive(pathname, entry.href) ? " accent" : ""}`}
          title={entry.label}
          aria-label={entry.label}
          style={isActive(pathname, entry.href) ? { borderLeft: "2px solid var(--ct-accent-strong)" } : undefined}
        >
          {entry.icon}
        </Link>
      );
    }

    const open = expanded.has(entry.id);
    const hasActive = groupHasActiveChild(pathname, entry);

    return (
      <div key={entry.id} style={{ display: "flex", flexDirection: "column" }}>
        <button
          className={`ct-rail-action${hasActive ? " accent" : ""}`}
          title={entry.label}
          aria-label={entry.label}
          onClick={() => toggleGroup(entry.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            ...(hasActive ? { borderLeft: "2px solid var(--ct-accent-strong)" } : {}),
          }}
        >
          {entry.icon}
        </button>
        {open &&
          entry.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={`ct-rail-action${isActive(pathname, child.href) ? " accent" : ""}`}
              title={child.label}
              aria-label={child.label}
              style={{
                paddingLeft: 10,
                opacity: 0.85,
                ...(isActive(pathname, child.href)
                  ? { borderLeft: "2px solid var(--ct-accent-strong)", opacity: 1 }
                  : {}),
              }}
            >
              {child.icon}
            </Link>
          ))}
      </div>
    );
  }

  return (
    <aside className="ct-rail-left">
      <Link href="/" className="ct-logo-slot" title="Gemflow" aria-label="Gemflow home">
        <HearstLogo />
      </Link>

      <div className="ct-rail-actions">
        {TOP_NAV.map((entry) => renderEntry(entry))}
      </div>

      <AccentSelector />

      <div className="ct-spacer" />

      <div className="ct-rail-actions">
        {BOTTOM_NAV.map((entry) => renderEntry(entry))}
      </div>

      <div className="ct-rail-bottom">
        <button className="ct-rail-badge" title="Connexions" aria-label="Connexions">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span className="ct-rail-badge-dot" aria-label="En ligne" />
        </button>
        <Link href="/profile" className="ct-avatar" title="Profile" aria-label="Profile">
          AB
        </Link>
      </div>
    </aside>
  );
}
