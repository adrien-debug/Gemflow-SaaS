"use client";

import { useState } from "react";
import { ChatKimi } from "./ChatKimi";

const STORAGE_KEY = "cockpit:rail-right-open";

function readOpen(): boolean {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved !== null ? saved === "1" : true;
}

export function RailRight() {
  const [open, setOpen] = useState<boolean>(readOpen);
  const [chatKey, setChatKey] = useState(0);

  function toggle() {
    setOpen((v) => {
      const next = !v;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  function newChat() {
    setChatKey((k) => k + 1);
  }

  return (
    <aside
      className="ct-rail-right"
      style={{
        width: open ? "var(--ct-rail-right)" : 48,
        minWidth: open ? "var(--ct-rail-right)" : 48,
        transition: "width var(--ct-dur-base) var(--ct-ease), min-width var(--ct-dur-base) var(--ct-ease)",
        overflow: "hidden",
      }}
    >
      <div className="ct-rail-right-header">
        <button
          className="ct-rail-right-btn"
          onClick={toggle}
          title={open ? "Replier le chat" : "Ouvrir le chat"}
          aria-label="Toggle chat"
          style={{ marginRight: open ? 8 : 0 }}
        >
          {open ? "›" : "‹"}
        </button>
        {open && <span className="ct-chat-status">Kimi K2.6</span>}
        {open && (
          <button className="ct-rail-right-btn" onClick={newChat} title="Nouvelle conversation" aria-label="Nouvelle conversation">
            +
          </button>
        )}
      </div>
      {open && <ChatKimi key={chatKey} />}
    </aside>
  );
}
