import { FC } from "react";
import { Link } from "react-router";
import { useMorningBriefing } from "@entities/ai-agent/hooks/useMorningBriefing";
import { AgentResponseView } from "@features/agents/artifacts";
import { MaisonCard } from "@features/agents/maison";
import "./styles.scss";

const formatTime = (date: Date) =>
  date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

const MorningBriefing: FC = () => {
  const { data, isFetching, isError, dataUpdatedAt, refetch, error } = useMorningBriefing();

  const handleLaunch = () => {
    void refetch();
  };

  const hasResponse = !!data;
  const briefedAt = dataUpdatedAt ? new Date(dataUpdatedAt) : null;
  const conversationId = data?.conversationId;
  const showRelaunch = hasResponse && !isFetching;

  return (
    <MaisonCard
      eyebrow="Briefing du jour"
      title="Synthèse"
      emphasized="atelier"
      density="tight"
      actions={
        showRelaunch ? (
          <button
            type="button"
            className="gf-briefing__relaunch"
            onClick={handleLaunch}
            aria-label="Relancer le briefing"
          >
            Relancer
          </button>
        ) : null
      }
    >
      <div className="gf-briefing">
        {!hasResponse && !isFetching ? (
          <div className="gf-briefing__intro">
            <p className="gf-briefing__lede">
              L'agent peut produire un état d'atelier synthétique : trois priorités, format structuré.
            </p>
            {isError ? (
              <p className="gf-briefing__error">
                {error instanceof Error ? error.message : "Une erreur est survenue lors du précédent appel."}
              </p>
            ) : null}
            <button type="button" className="gf-briefing__cta" onClick={handleLaunch}>
              Lancer le briefing
            </button>
          </div>
        ) : null}

        {isFetching ? (
          <div className="gf-briefing__loading" aria-live="polite">
            <span className="gf-briefing__loading-dot" aria-hidden />
            <span className="gf-briefing__loading-label">Analyse en cours…</span>
          </div>
        ) : null}

        {hasResponse && !isFetching ? (
          <div className="gf-briefing__response">
            <div className="gf-briefing__response-scroll">
              <AgentResponseView response={data} />
            </div>
            <footer className="gf-briefing__foot">
              {briefedAt ? (
                <span className="gf-briefing__timestamp">Briefé à {formatTime(briefedAt)}</span>
              ) : null}
              <Link
                to={conversationId ? `/ai-agent?conversationId=${conversationId}` : "/ai-agent"}
                className="gf-briefing__deep-link"
              >
                Approfondir cette analyse
              </Link>
            </footer>
          </div>
        ) : null}
      </div>
    </MaisonCard>
  );
};

export default MorningBriefing;
