import DashboardOutlined from "@ant-design/icons/lib/icons/DashboardOutlined";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import ShoppingOutlined from "@ant-design/icons/lib/icons/ShoppingOutlined";
import UsergroupAddOutlined from "@ant-design/icons/lib/icons/UsergroupAddOutlined";
import ContactsOutlined from "@ant-design/icons/lib/icons/ContactsOutlined";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { Link } from "react-router";

export const dashboardTopMenuItems: MenuItem[] = [
  {
    key: "/dashboard",
    label: (
      <Link id="dashboard" to="/dashboard">
        Dashboard
      </Link>
    ),
    icon: <DashboardOutlined />,
  },
  {
    key: "/orders",
    label: (
      <Link id="orders" to="/orders">
        Orders
      </Link>
    ),
    icon: <ShoppingOutlined />,
  },
  {
    key: "/atelier",
    label: (
      <Link id="atelier" to="/atelier">
        Atelier
      </Link>
    ),
    icon: <DesktopOutlined />,
  },
  {
    key: "/crm",
    label: (
      <Link id="crm" to="/crm">
        CRM
      </Link>
    ),
    icon: <ContactsOutlined />,
  },
  {
    key: "/administration",
    label: (
      <Link id="administration" to="/administration">
        Administration
      </Link>
    ),
    icon: <UsergroupAddOutlined />,
  },
] as const;

export const dashboardBottomMenuItems: MenuItem[] = [] as const;
