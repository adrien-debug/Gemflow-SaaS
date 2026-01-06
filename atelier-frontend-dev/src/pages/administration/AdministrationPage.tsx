import { brandingColorPalette } from "@shared/constants/branding.ts";
import AddClientButton from "@features/clients/add-client-button/ui/AddClientButton";
import ClientsTable from "@features/clients/clients-table/ui/ClientsTable";
import AddSupplierButton from "@features/suppliers/add-supplier-button/ui/AddSuplierButton";
import SuppliersTable from "@features/suppliers/suppliers-table/ui/SuppliersTable";
import AddUserButton from "@features/users/add-user-button/ui/AddUserButton";
import UsersTable from "@features/users/users-table/ui/UsersTable";
import SubHeader from "@shared/ui/SubHeader";
import Flex from "antd/es/flex";
import Tabs from "antd/es/tabs";
import Typography from "antd/es/typography";
import { CSSProperties } from "react";
import { TabKeys } from "@pages/administration/constants/tab-keys.ts";
import useActiveTab from "@shared/hooks/useActiveTab.ts";

const styles: CSSProperties = {
  padding: "0 24px",
};

const AdministrationPage = () => {
  const { activeTab, setActiveTab } = useActiveTab(TabKeys.USERS_AND_ROLES);

  return (
    <Flex vertical style={styles}>
      <Typography.Title level={2} style={{ color: brandingColorPalette.brand6, marginBottom: 20 }}>
        Administration
      </Typography.Title>

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
