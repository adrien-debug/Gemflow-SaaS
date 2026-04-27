import "@shared/ui/layouts/DashboardLayout/styles.scss";
import { FC, PropsWithChildren } from "react";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { MaisonSider } from "@features/agents/maison";

interface Props extends PropsWithChildren {
  topItems?: MenuItem[];
  bottomItems?: MenuItem[];
}

const DashboardLayout: FC<Props> = ({ children, topItems, bottomItems }) => {
  return (
    <div className="dashboard-layout gf-maison">
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
