import "@shared/ui/layouts/DashboardLayout/styles.scss";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { MaisonSider } from "@features/agents/maison";

interface Props extends PropsWithChildren {
  topItems?: MenuItem[];
  bottomItems?: MenuItem[];
}

const DashboardLayout: FC<Props> = ({ children, topItems, bottomItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <div className={`dashboard-layout gf-maison${drawerOpen ? " is-drawer-open" : ""}`}>
      <button
        type="button"
        className="dashboard-layout__burger"
        aria-label={drawerOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={drawerOpen}
        onClick={() => setDrawerOpen((v) => !v)}>
        <span aria-hidden />
      </button>
      <div
        className={`dashboard-layout__backdrop${drawerOpen ? " is-visible" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden
      />
      <MaisonSider
        topItems={topItems}
        bottomItems={bottomItems}
        collapsed={false}
        onToggle={() => {}}
        hideToggle
      />
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
