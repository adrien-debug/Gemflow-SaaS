import { ReactNode } from "react";
import { BottomBar } from "./BottomBar";

export function CenterPanel({ children }: { children: ReactNode }) {
  return (
    <div className="ct-center-panel">
      <div className="ct-page-area">{children}</div>
      <BottomBar />
    </div>
  );
}
