import { brandingColorPalette } from "@shared/constants/branding";
import SubHeader from "@shared/ui/SubHeader";
import Flex from "antd/es/flex";
import Tabs from "antd/es/tabs";
import Typography from "antd/es/typography";
import { CSSProperties } from "react";
import { TabKeys } from "@pages/crm/constants/tab-keys";
import useActiveTab from "@shared/hooks/useActiveTab";
import CrmContactsTable from "@features/crm/contacts-table/ui/CrmContactsTable";
import AddContactButton from "@features/crm/add-contact-button/ui/AddContactButton";

const styles: CSSProperties = {
  padding: "0 24px",
};

const CrmPage = () => {
  const { activeTab, setActiveTab } = useActiveTab(TabKeys.CONTACTS);

  return (
    <Flex vertical style={styles}>
      <Typography.Title level={2} style={{ color: brandingColorPalette.brand6, marginBottom: 20 }}>
        CRM
      </Typography.Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: TabKeys.CONTACTS,
            label: "Contacts",
            children: (
              <Flex vertical>
                <SubHeader title="Contacts" description="Manage your contacts and communications">
                  <AddContactButton />
                </SubHeader>
                <CrmContactsTable />
              </Flex>
            ),
          },
          {
            key: TabKeys.COMMUNICATIONS,
            label: "Communications",
            children: (
              <Flex vertical>
                <SubHeader title="Communications" description="View all communications history">
                  {null}
                </SubHeader>
                <Typography.Text>Communications list coming soon...</Typography.Text>
              </Flex>
            ),
          },
          {
            key: TabKeys.TEMPLATES,
            label: "Email Templates",
            children: (
              <Flex vertical>
                <SubHeader title="Email Templates" description="Manage your email templates">
                  {null}
                </SubHeader>
                <Typography.Text>Email templates coming soon...</Typography.Text>
              </Flex>
            ),
          },
        ]}
      />
    </Flex>
  );
};

export default CrmPage;

