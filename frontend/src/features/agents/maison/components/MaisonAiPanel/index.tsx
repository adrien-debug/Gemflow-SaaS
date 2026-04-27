import { FC, ReactNode } from "react";
import "./styles.scss";

interface MaisonAiPanelProps {
  title: string;
  emphasized?: string;
  subtitle?: string;
  body: ReactNode;
  composer?: ReactNode;
}

const MaisonAiPanel: FC<MaisonAiPanelProps> = ({
  title,
  emphasized,
  subtitle = "Neural Engine Active",
  body,
  composer,
}) => {
  return (
    <aside className="gf-maison-ai-panel">
      <div className="gf-maison-ai-panel__head">
        <div className="gf-maison-ai-panel__orb" aria-hidden />
        <h2 className="gf-maison-ai-panel__title">
          {title}
          {emphasized ? <em> {emphasized}</em> : null}
        </h2>
        <div className="gf-maison-ai-panel__subtitle">
          <span className="gf-maison-ai-panel__live-dot" aria-hidden />
          {subtitle}
        </div>
      </div>

      <div className="gf-maison-ai-panel__body">{body}</div>

      {composer ? <div className="gf-maison-ai-panel__composer">{composer}</div> : null}
    </aside>
  );
};

export default MaisonAiPanel;
