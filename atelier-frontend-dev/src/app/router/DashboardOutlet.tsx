import { FC } from "react";
import DashboardLayout from "@shared/ui/layouts/DashboardLayout";
import { Outlet } from "react-router";
import { dashboardBottomMenuItems, dashboardTopMenuItems } from "@app/constants/dashboard-menu.tsx";
import { dashboardTheme } from "@app/theme/dashboard-theme.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useModal from "@shared/hooks/useModal.ts";
import ConfigProvider from "antd/es/config-provider";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { useFilterMenuByRoles } from "@entities/user-roles/hooks/useFilterMenuByRoles.ts";
import { RolesMap } from "@app/constants/roles-map.ts";

const DashboardOutlet: FC = () => {
  const { contextHolder } = useMessage();
  const { contextHolder: modalContextHolder } = useModal();

  const filteredTopMenuItems = useFilterMenuByRoles<MenuItem>({
    menuItems: dashboardTopMenuItems,
    rolesMap: RolesMap,
  });

  const filteredBottomMenuItems = useFilterMenuByRoles<MenuItem>({
    menuItems: dashboardBottomMenuItems,
    rolesMap: RolesMap,
  });

  return (
    <ConfigProvider theme={dashboardTheme}>
      {contextHolder}
      {modalContextHolder}
      <DashboardLayout topItems={filteredTopMenuItems} bottomItems={filteredBottomMenuItems}>
        <Outlet />
      </DashboardLayout>
    </ConfigProvider>
  );
};

export default DashboardOutlet;
