import { FC, useMemo } from "react";
import { AgentChatResponse, Artifact } from "./types";
import ArtifactRenderer from "./components/ArtifactRenderer";
import "./styles/artifacts.scss";

interface AgentResponseViewProps {
  response: AgentChatResponse;
}

const MAX_ARTIFACTS = 32;

const buildErrorArtifact = (errorMessage: string | null): Artifact => ({
  type: "callout",
  title: null,
  payload: {
    level: "critical",
    title: "Erreur agent",
    body:
      errorMessage?.trim() && errorMessage.trim().length > 0
        ? errorMessage
        : "Une erreur inconnue est survenue côté agent.",
  },
});

const maxIterationsArtifact = (): Artifact => ({
  type: "callout",
  title: null,
  payload: {
    level: "warning",
    title: "Analyse interrompue",
    body: "L'agent a atteint la limite d'itérations. Relance la requête ou précise ta question.",
  },
});

const AgentResponseView: FC<AgentResponseViewProps> = ({ response }) => {
  const { status, message, errorMessage } = response;

  const artifacts = useMemo<Artifact[]>(() => {
    const incoming = response.artifacts ?? [];
    const limited = incoming.slice(0, MAX_ARTIFACTS);

    if (status === "ERROR") {
      return [buildErrorArtifact(errorMessage)];
    }
    if (status === "MAX_ITERATIONS") {
      return [...limited, maxIterationsArtifact()];
    }
    return limited;
  }, [response.artifacts, status, errorMessage]);

  const showMessage = status !== "ERROR" && message && message.trim().length > 0;
  const showArtifacts = artifacts.length > 0;

  if (!showMessage && !showArtifacts) {
    return null;
  }

  return (
    <div className="gf-artifacts">
      {showMessage ? <p className="gf-artifacts__message">{message}</p> : null}
      {showArtifacts ? (
        <div className="gf-artifacts__list">
          {artifacts.map((artifact, idx) => (
            <ArtifactRenderer key={idx} artifact={artifact} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default AgentResponseView;
