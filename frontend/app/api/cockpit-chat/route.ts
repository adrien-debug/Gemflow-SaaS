import { NextResponse } from "next/server";
import { kimi, KIMI_MODEL } from "@/lib/llm/kimi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT =
  "Tu es Kimi, l'assistant Hearst intégré au Cockpit Gemflow. " +
  "Réponses en français, courtes et directes. Pas de réflexion verbeuse. " +
  "Tu peux structurer en listes/code/gras Markdown.";

function makeThinkFilter() {
  let buf = "";
  let inThink = false;

  return (chunk: string): string => {
    buf += chunk;
    let out = "";

    while (buf.length > 0) {
      if (inThink) {
        const close = buf.indexOf("</think>");
        if (close === -1) {
          if (buf.length > 9) buf = buf.slice(-9);
          return out;
        }
        buf = buf.slice(close + 8);
        inThink = false;
      } else {
        const open = buf.indexOf("<think>");
        if (open === -1) {
          if (buf.length > 9) {
            out += buf.slice(0, -9);
            buf = buf.slice(-9);
          }
          return out;
        }
        out += buf.slice(0, open);
        buf = buf.slice(open + 7);
        inThink = true;
      }
    }
    return out;
  };
}

export async function POST(req: Request) {
  let body: { messages?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string",
  );

  if (messages.length === 0) {
    return NextResponse.json({ error: "no_messages" }, { status: 400 });
  }

  if (!process.env.HYPERCLI_API_KEY) {
    return NextResponse.json({ error: "kimi_not_configured" }, { status: 503 });
  }

  const stream = await kimi.chat.completions.create({
    model: KIMI_MODEL,
    stream: true,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
  });

  const filter = makeThinkFilter();
  const encoder = new TextEncoder();

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const part of stream) {
          const delta = part.choices[0]?.delta?.content ?? "";
          if (!delta) continue;
          const filtered = filter(delta);
          if (filtered) controller.enqueue(encoder.encode(filtered));
        }
        controller.close();
      } catch (err) {
        controller.enqueue(encoder.encode(`\n\n⚠ ${(err as Error).message}`));
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store, no-transform",
      "x-accel-buffering": "no",
    },
  });
}
