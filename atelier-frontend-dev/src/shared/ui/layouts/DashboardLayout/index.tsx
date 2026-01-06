import "@shared/ui/layouts/DashboardLayout/styles.scss";
import { FC, PropsWithChildren } from "react";
import Logo from "@shared/ui/icons/Logo";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { useLocation } from "react-router";
import Layout from "antd/es/layout";
import Flex from "antd/es/flex";
import Menu from "antd/es/menu";

const { Content, Sider } = Layout;

interface Props extends PropsWithChildren {
  topItems?: MenuItem[];
  bottomItems?: MenuItem[];
}

const DashboardLayout: FC<Props> = ({ children, topItems, bottomItems }) => {
  const location = useLocation();

  const selectedKey = location.pathname.split("/").slice(0, 2).join("/");

  return (
    <Layout className="dashboard-layout" style={{ minWidth: 1200 }}>
      <Sider className="sider" theme="dark" width={220}>
        <Flex vertical flex={1} className="sider-container">
          <Flex justify="center" align="center" className="sider-logo-container">
            <Logo className="sider-logo" />
          </Flex>
          <Flex vertical justify="space-between" flex={1}>
            {topItems?.length ? (
              <Menu
                defaultOpenKeys={["dashboard-menu-pre-production", "dashboard-menu-inventory"]}
                theme="dark"
                selectedKeys={[selectedKey, location.pathname]}
                className="sider-menu-top"
                items={topItems}
                mode="inline"
                expandIcon={null}
              />
            ) : (
              <div></div>
            )}
            {bottomItems?.length ? (
              <Menu theme="dark" selectedKeys={[selectedKey]} items={bottomItems} mode="inline" expandIcon={null} />
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
