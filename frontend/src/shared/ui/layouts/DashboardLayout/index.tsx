import "@shared/ui/layouts/DashboardLayout/styles.scss";
import { FC, PropsWithChildren, useState } from "react";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { MaisonSider } from "@features/agents/maison";

interface Props extends PropsWithChildren {
  topItems?: MenuItem[];
  bottomItems?: MenuItem[];
}

const DashboardLayout: FC<Props> = ({ children, topItems, bottomItems }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="dashboard-layout gf-maison">
      <MaisonSider
        topItems={topItems}
        bottomItems={bottomItems}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
