import { useQuery } from "@tanstack/react-query";
import AiAgentApi from "../api/ai-agent.api";
import { AI_AGENT_MORNING_BRIEFING_KEY } from "../constants/query-keys";
import { isDevMode } from "@shared/config/dev-mode.config";
import type { AgentChatResponse } from "@features/agents/artifacts";

const BRIEFING_PROMPT =
  "Quel est l'état de l'atelier ce matin ? Trois priorités maximum, format artifacts (kpi_grid + callouts).";

const briefingDateKey = () => new Date().toISOString().slice(0, 10);

const mockBriefing = (): AgentChatResponse => ({
  conversationId: "dev-morning-briefing",
  agent: "default",
  model: "claude-sonnet-4-6",
  status: "SUCCESS",
  errorMessage: null,
  message:
    "Trois points retiennent l'attention ce matin. Deux retards critiques et une commande VIP en attente de validation gravure.",
  toolsUsed: ["count_orders_by_status", "list_recent_orders", "emit_artifact"],
  artifacts: [
    {
      type: "kpi_grid",
      title: null,
      payload: {
        items: [
          { value: 18, label: "En production", unit: null, deltaPercent: null, sublabel: "dont 6 en montage" },
          { value: 3, label: "Retards", unit: null, deltaPercent: null, sublabel: "Mme Laurent · Al Thani · Dubois" },
          { value: 8, label: "Priorité haute", unit: null, deltaPercent: null, sublabel: "VIP + Maisons partenaires" },
        ],
      },
    },
    {
      type: "callout",
      title: null,
      payload: {
        level: "warning",
        title: "Retard critique — Bague Solitaire 2.5ct",
        body:
          "3 jours de dépassement. Le diamant central est attendu d'Anvers ce jour. Demande à l'agent un point client si la pierre n'arrive pas avant 15h.",
      },
    },
    {
      type: "callout",
      title: null,
      payload: {
        level: "info",
        title: "Validation gravure attendue",
        body:
          "Chevalière de Rothschild — la gravure personnalisée bloque la fin du polissage. Le commercial doit relancer le client.",
      },
    },
  ],
  iterations: 3,
  durationMs: 2840,
  usage: {
    inputTokens: 2100,
    outputTokens: 380,
    cacheReadTokens: 1800,
    cacheCreationTokens: 0,
    costMicroUsd: 6200,
  },
});

export const useMorningBriefing = () => {
  return useQuery<AgentChatResponse>({
    queryKey: [AI_AGENT_MORNING_BRIEFING_KEY, briefingDateKey()],
    queryFn: isDevMode
      ? () => Promise.resolve(mockBriefing())
      : () => AiAgentApi.chatV2({ message: BRIEFING_PROMPT, conversationId: undefined, agent: "default" }),
    enabled: false,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};
