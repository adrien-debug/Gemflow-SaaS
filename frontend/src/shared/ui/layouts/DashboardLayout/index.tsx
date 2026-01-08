import "@shared/ui/layouts/DashboardLayout/styles.scss";
import { FC, PropsWithChildren, useState } from "react";
import Logo from "@shared/ui/icons/Logo";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { useLocation } from "react-router";
import Layout from "antd/es/layout";
import Flex from "antd/es/flex";
import Menu from "antd/es/menu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

interface Props extends PropsWithChildren {
  topItems?: MenuItem[];
  bottomItems?: MenuItem[];
}

const DashboardLayout: FC<Props> = ({ children, topItems, bottomItems }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const selectedKey = location.pathname.split("/").slice(0, 2).join("/");

  return (
    <Layout className="dashboard-layout" style={{ minWidth: 1200 }}>
      <Sider 
        className={`sider ${collapsed ? 'sider-collapsed' : ''}`} 
        theme="dark" 
        width={240}
        collapsedWidth={72}
        collapsed={collapsed}
        collapsible
        trigger={null}
      >
        <Flex vertical flex={1} className="sider-container">
          <Flex justify="center" align="center" className="sider-logo-container">
            {collapsed ? (
              <div className="sider-logo-mini">A</div>
            ) : (
              <Logo className="sider-logo" />
            )}
          </Flex>
          
          <div className="sider-separator" />
          
          <button 
            className="sider-toggle"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Ouvrir le menu" : "Fermer le menu"}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>

          <Flex vertical justify="space-between" flex={1} className="sider-menus">
            {topItems?.length ? (
              <Menu
                defaultOpenKeys={collapsed ? [] : ["dashboard-menu-pre-production", "dashboard-menu-inventory"]}
                theme="dark"
                selectedKeys={[selectedKey, location.pathname]}
                className="sider-menu-top"
                items={topItems}
                mode="inline"
                inlineCollapsed={collapsed}
                expandIcon={null}
              />
            ) : (
              <div></div>
            )}
            {bottomItems?.length ? (
              <Menu 
                theme="dark" 
                selectedKeys={[selectedKey]} 
                items={bottomItems} 
                mode="inline" 
                inlineCollapsed={collapsed}
                expandIcon={null} 
              />
            ) : (
              <div></div>
            )}
          </Flex>
        </Flex>
      </Sider>
      <Layout className="dashboard-content">
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
