"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { HearstLogo } from "./HearstLogo";

type Msg = { role: "user" | "assistant"; content: string };

const INITIAL: Msg[] = [
  { role: "assistant", content: "Bonjour. Que voulez-vous orchestrer aujourd'hui ?" },
];

export function ChatKimi() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/cockpit-chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const err = await res.text().catch(() => "");
        setMessages([...next, { role: "assistant", content: `⚠ Erreur (${res.status}). ${err.slice(0, 200)}` }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages([...next, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role !== "assistant") return prev;
          return [...prev.slice(0, -1), { ...last, content: acc }];
        });
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: `⚠ ${(err as Error).message}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ct-chat">
      <div className="ct-chat-messages" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`ct-chat-msg ${m.role}`}>
            <div className="ct-chat-msg-avatar">
              {m.role === "assistant" ? <HearstLogo width={13} height={14} /> : "AB"}
            </div>
            <div className="ct-chat-msg-bubble">{m.content || "…"}</div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="ct-chat-input-wrap">
        <input
          type="text"
          className="ct-chat-input"
          placeholder={busy ? "Kimi écrit…" : "Demandez à Kimi…"}
          aria-label="Message à Kimi"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
        />
      </form>
    </div>
  );
}
