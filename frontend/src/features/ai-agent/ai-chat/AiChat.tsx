import { FC, useState } from "react";
import { useAgentChatV2 } from "@entities/ai-agent/hooks/useAgentChatV2";
import {
  AgentResponseView,
  ArtifactLocaleContext,
  type AgentChatResponse,
  type ArtifactLocale,
} from "@features/agents/artifacts";
import MaisonComposer from "@features/agents/maison/components/MaisonComposer";
import "./styles.scss";

interface ChatTurn {
  id: string;
  role: "user" | "agent";
  userText?: string;
  response?: AgentChatResponse;
  errorText?: string;
}

interface AiChatProps {
  locale?: ArtifactLocale;
}

const SUGGESTIONS = [
  "Statistiques des commandes en cours",
  "Prix actuels des métaux précieux",
  "Recommandation de prix pour une commande",
  "Importer une commande externe",
];

export const AiChat: FC<AiChatProps> = ({ locale = "fr-FR" }) => {
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const chat = useAgentChatV2();

  const handleSend = async () => {
    const message = inputValue.trim();
    if (!message) return;

    const userTurn: ChatTurn = {
      id: `u-${Date.now()}`,
      role: "user",
      userText: message,
    };
    setTurns((prev) => [...prev, userTurn]);
    setInputValue("");

    try {
      const response = await chat.mutateAsync({ message, conversationId });
      if (response.conversationId) {
        setConversationId(response.conversationId);
      }
      setTurns((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "agent",
          response,
        },
      ]);
    } catch (error) {
      const fallback =
        error instanceof Error ? error.message : "Une erreur réseau est survenue. Réessaie ou recharge la page.";
      setTurns((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "agent",
          errorText: fallback,
        },
      ]);
    }
  };

  const onSuggestion = (text: string) => {
    setInputValue(text);
  };

  return (
    <ArtifactLocaleContext.Provider value={locale}>
      <section className="gf-maison-chat">
        <div className="gf-maison-chat__stream">
          {turns.length === 0 ? (
            <div className="gf-maison-chat__empty">
              <p className="gf-maison-chat__empty-eyebrow">Atelier IA · Démarrage</p>
              <h2 className="gf-maison-chat__empty-title">
                Comment puis-je vous <em>aider</em> ?
              </h2>
              <p className="gf-maison-chat__empty-body">
                Pose une question sur la production, les pierres, les coûts, ou la facturation. L'agent appelle les
                outils internes nécessaires et structure la réponse.
              </p>
              <ul className="gf-maison-chat__suggestions">
                {SUGGESTIONS.map((s) => (
                  <li key={s}>
                    <button type="button" className="gf-maison-chat__chip" onClick={() => onSuggestion(s)}>
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="gf-maison-chat__turns">
              {turns.map((turn) => (
                <li key={turn.id} className={`gf-maison-chat__turn is-${turn.role}`}>
                  {turn.role === "user" ? (
                    <div className="gf-maison-chat__user-bubble">{turn.userText}</div>
                  ) : turn.errorText ? (
                    <AgentResponseView
                      response={{
                        conversationId: conversationId ?? "",
                        agent: "chat",
                        model: "",
                        status: "ERROR",
                        errorMessage: turn.errorText,
                        message: null,
                        toolsUsed: [],
                        artifacts: [],
                        iterations: 0,
                        durationMs: 0,
                        usage: {
                          inputTokens: 0,
                          outputTokens: 0,
                          cacheReadTokens: 0,
                          cacheCreationTokens: 0,
                          costMicroUsd: 0,
                        },
                      }}
                    />
                  ) : turn.response ? (
                    <AgentResponseView response={turn.response} />
                  ) : null}
                </li>
              ))}
            </ul>
          )}

          {chat.isPending ? (
            <div className="gf-maison-chat__pending">
              <span className="gf-maison-chat__pending-dot" aria-hidden />
              <span>L'atelier consulte les outils…</span>
            </div>
          ) : null}
        </div>

        <div className="gf-maison-chat__composer">
          <MaisonComposer
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSend}
            loading={chat.isPending}
            placeholder="Demander une analyse contextuelle…"
            modelLabel="Atelier · Claude"
            ctaLabel="Envoyer"
          />
        </div>
      </section>
    </ArtifactLocaleContext.Provider>
  );
};
