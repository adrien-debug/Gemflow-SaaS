import { FC } from "react";
import { CalloutPayload } from "../types";

interface CalloutProps {
  payload: CalloutPayload;
}

const Callout: FC<CalloutProps> = ({ payload }) => {
  const { level, title, body } = payload;
  const className = `gf-callout gf-callout--${level}`;

  return (
    <aside className={className} role={level === "critical" ? "alert" : "note"}>
      <div className="gf-callout__rule" aria-hidden="true" />
      <div className="gf-callout__body-wrap">
        {title ? <p className="gf-callout__title">{title}</p> : null}
        <p className="gf-callout__body">{body}</p>
      </div>
    </aside>
  );
};

export default Callout;
