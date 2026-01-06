import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import DatabaseOutlined from "@ant-design/icons/lib/icons/DatabaseOutlined";
import DesktopOutlined from "@ant-design/icons/lib/icons/DesktopOutlined";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import ShoppingOutlined from "@ant-design/icons/lib/icons/ShoppingOutlined";
import UsergroupAddOutlined from "@ant-design/icons/lib/icons/UsergroupAddOutlined";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { Link } from "react-router";
import { FireOutlined } from "@ant-design/icons";

export const dashboardTopMenuItems: MenuItem[] = [
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
    key: "dashboard-menu-pre-production",
    label: <span id="pre-production">Pre-Production</span>,
    icon: <DesktopOutlined />,
    children: [
      {
        key: "/cad",
        label: (
          <Link id="cad" to="/cad">
            CAD
          </Link>
        ),
      },
      {
        key: "/3d-printing",
        label: (
          <Link id="printing" to="/3d-printing">
            3D Printing
          </Link>
        ),
      },
      {
        key: "/pre-casting",
        label: (
          <Link to="/pre-casting" id="pre-casting">
            Pre casting
          </Link>
        ),
      },
    ],
  },
  {
    key: "/casting",
    label: (
      <Link to="/casting" id="casting">
        Casting
      </Link>
    ),
    icon: <FireOutlined />,
  },
  {
    key: "/stock",
    label: (
      <Link id="stock" to="/stock">
        Stock
      </Link>
    ),
    icon: <DatabaseOutlined />,
  },
  {
    key: "dashboard-menu-inventory",
    label: <span id="inventory">Inventory</span>,
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "/diamonds",
        label: (
          <Link id="diamonds" to="/diamonds">
            Diamonds
          </Link>
        ),
      },
      {
        key: "/gemstones",
        label: (
          <Link id="gemstones" to="/gemstones">
            Gemstones
          </Link>
        ),
      },
      {
        key: "/metals",
        label: (
          <Link id="metals" to="/metals">
            Metals
          </Link>
        ),
      },
    ],
  },
] as const;

export const dashboardBottomMenuItems: MenuItem[] = [
  {
    key: "/administration",
    label: (
      <Link id="administration" to="/administration">
        Administration
      </Link>
    ),
    icon: <UsergroupAddOutlined />,
  },
  {
    key: "/settings",
    label: (
      <Link id="settings" to="/settings">
        Settings
      </Link>
    ),
    icon: <SettingOutlined />,
  },
  {
    key: "/profile",
    label: (
      <Link id="profile" to="/profile">
        Profile
      </Link>
    ),
    icon: <UserOutlined />,
  },
] as const;
