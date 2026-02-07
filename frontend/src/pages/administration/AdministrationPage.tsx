import AddClientButton from "@features/clients/add-client-button/ui/AddClientButton";
import ClientsTable from "@features/clients/clients-table/ui/ClientsTable";
import AddSupplierButton from "@features/suppliers/add-supplier-button/ui/AddSuplierButton";
import SuppliersTable from "@features/suppliers/suppliers-table/ui/SuppliersTable";
import AddUserButton from "@features/users/add-user-button/ui/AddUserButton";
import UsersTable from "@features/users/users-table/ui/UsersTable";
import SubHeader from "@shared/ui/SubHeader";
import PageHero from "@shared/ui/PageHero";
import Flex from "antd/es/flex";
import Tabs from "antd/es/tabs";
import { CSSProperties } from "react";
import { TabKeys } from "@pages/administration/constants/tab-keys.ts";
import useActiveTab from "@shared/hooks/useActiveTab.ts";
import { SettingOutlined } from "@ant-design/icons";

const styles: CSSProperties = {
  padding: "0 24px",
};

const AdministrationPage = () => {
  const { activeTab, setActiveTab } = useActiveTab(TabKeys.USERS_AND_ROLES);

  return (
    <Flex vertical style={styles}>
      <PageHero
        icon={<SettingOutlined />}
        badge="Management"
        title="Administration"
        subtitle="Manage users, roles, clients and suppliers across the platform"
      />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: TabKeys.USERS_AND_ROLES,
            label: "Users and roles",
            children: (
              <Flex vertical>
                <SubHeader title="Users" description="Assign roles to all users of the portal">
                  <AddUserButton />
                </SubHeader>
                <UsersTable />
              </Flex>
            ),
          },
          {
            key: TabKeys.CLIENTS,
            label: "Clients",
            children: (
              <Flex vertical>
                <SubHeader title="Clients" description="Assign roles to all clients of the portal">
                  <AddClientButton />
                </SubHeader>
                <ClientsTable />
              </Flex>
            ),
          },
          {
            key: TabKeys.SUPPLIERS,
            label: "Suppliers",
            children: (
              <Flex vertical>
                <SubHeader title="Suppliers" description="Assign roles to all suppliers of the portal">
                  <AddSupplierButton />
                </SubHeader>
                <SuppliersTable />
              </Flex>
            ),
          },
        ]}
      />
    </Flex>
  );
};

export default AdministrationPage;
