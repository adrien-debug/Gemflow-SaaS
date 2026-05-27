import { FC, ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import { MaisonComposer } from "@features/agents/maison";
import AtelierLogo3D from "../AtelierLogo3D";
import "./styles.scss";

export interface DashboardAsideInsight {
  eyebrow: string;
  body: ReactNode;
}

interface DashboardAsideProps {
  insights: DashboardAsideInsight[];
}

const DashboardAside: FC<DashboardAsideProps> = ({ insights }) => {
  const [draft, setDraft] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const message = draft.trim();
    if (!message) return;
    navigate(`/ai-agent?message=${encodeURIComponent(message)}`);
  };

  return (
    <aside className="gf-dashboard-aside">
      <div className="gf-dashboard-aside__cover">
        <AtelierLogo3D size={96} />
        <h2 className="gf-dashboard-aside__title">Atelier <em>AI</em></h2>
        <span className="gf-dashboard-aside__status">
          <span className="gf-dashboard-aside__status-dot" aria-hidden />
          Conseiller actif
        </span>
      </div>

      {insights.length > 0 && (
        <div className="gf-dashboard-aside__body">
          <p className="gf-dashboard-aside__section-title">Insights actionnables</p>
          <div className="gf-dashboard-aside__insights">
            {insights.map((insight, idx) => (
              <article key={idx} className="gf-dashboard-aside__insight">
                <p className="gf-dashboard-aside__insight-eyebrow">{insight.eyebrow}</p>
                <div className="gf-dashboard-aside__insight-body">{insight.body}</div>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="gf-dashboard-aside__composer">
        <MaisonComposer
          value={draft}
          onChange={setDraft}
          onSubmit={handleSubmit}
          placeholder="Demander une analyse contextuelle…"
          modelLabel="Atelier · Claude"
          ctaLabel="Envoyer"
        />
      </div>

      <div className="gf-dashboard-aside__footer">
        <span className="gf-dashboard-aside__footer-label">Atelier · Intelligence</span>
      </div>
    </aside>
  );
};

export default DashboardAside;
