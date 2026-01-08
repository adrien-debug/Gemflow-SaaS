import "./styles.scss";
import { FC } from "react";
import Flex from "antd/es/flex";
import Tabs, { TabsProps } from "antd/es/tabs";
import PersonalDetailsPage from "@pages/profile/PersonalDetailsPage.tsx";
import SecurityPage from "@pages/profile/SecurityPage.tsx";
import LogoutButton from "@features/profile/profile-logout-button/ui/LogoutButton";
import ActionBar from "@shared/ui/ActionBar";
import { TabKeys } from "@pages/profile/constants/tab-keys.ts";
import useActiveTab from "@shared/hooks/useActiveTab.ts";

const items: TabsProps["items"] = [
  {
    key: TabKeys.PERSONAL_DETAILS,
    label: "Personal Details",
    children: <PersonalDetailsPage />,
  },
  {
    key: TabKeys.SECURITY,
    label: "Security",
    children: <SecurityPage />,
  },
] as const;

const Profile: FC = () => {
  const { activeTab, setActiveTab } = useActiveTab(TabKeys.PERSONAL_DETAILS);

  return (
    <Flex vertical className="container-profile">
      <ActionBar title="Profile" children={<LogoutButton />} />
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
    </Flex>
  );
};

export default Profile;
