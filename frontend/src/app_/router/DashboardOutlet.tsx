import { FC, useContext } from "react";
import DashboardLayout from "@shared/ui/layouts/DashboardLayout";
import { Outlet, useLocation } from "react-router";
import { dashboardBottomMenuItems, dashboardTopMenuItems } from "@app/constants/dashboard-menu.tsx";
import { dashboardTheme } from "@app/theme/dashboard-theme.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useModal from "@shared/hooks/useModal.ts";
import ConfigProvider from "antd/es/config-provider";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { useFilterMenuByRoles } from "@entities/user-roles/hooks/useFilterMenuByRoles.ts";
import { RolesMap } from "@app/constants/roles-map.ts";
import { AiAgentFloatingWidget } from "@features/ai-agent/floating-widget";
import { UserContext } from "@shared/providers/UserProvider.tsx";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";

const DashboardOutlet: FC = () => {
  const { contextHolder } = useMessage();
  const { contextHolder: modalContextHolder } = useModal();
  const { user } = useContext(UserContext);

  const filteredTopMenuItems = useFilterMenuByRoles<MenuItem>({
    menuItems: dashboardTopMenuItems,
    rolesMap: RolesMap,
  });

  const filteredBottomMenuItems = useFilterMenuByRoles<MenuItem>({
    menuItems: dashboardBottomMenuItems,
    rolesMap: RolesMap,
  });

  // Show AI widget only for ADMIN and SUPER_ADMIN, and hide it on the dedicated /ai-agent page
  const location = useLocation();
  const canUseAiAgent = user?.role.code === UserRoleEnum.ADMIN || user?.role.code === UserRoleEnum.SUPER_ADMIN;
  const showFloatingWidget = canUseAiAgent && !location.pathname.startsWith("/ai-agent");

  return (
    <ConfigProvider theme={dashboardTheme}>
      {contextHolder}
      {modalContextHolder}
      <DashboardLayout topItems={filteredTopMenuItems} bottomItems={filteredBottomMenuItems}>
        <Outlet />
      </DashboardLayout>
      {showFloatingWidget && <AiAgentFloatingWidget />}
    </ConfigProvider>
  );
};

export default DashboardOutlet;
