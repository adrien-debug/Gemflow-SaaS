import { FC } from "react";
import "./styles.scss";
import Tabs, { TabsProps } from "antd/es/tabs";
import AppstoreOutlined from "@ant-design/icons/lib/icons/AppstoreOutlined";
import Flex from "antd/es/flex";
import MetalPriceLabels from "@features/settings/metal-price-labels/ui/MetalPriceLabels";
import Prices from "@features/settings/prices/ui/Prices";
import Labour from "@features/settings/labour/ui/Labour";
import Metals from "@features/settings/metals/ui/Metals";
import AlloyParameters from "@features/settings/alloy-parameters/ui/AlloyParameters";
import Cylinders from "@features/settings/cylinders/ui/Cylinders";
import Diamonds from "@features/settings/diamonds/ui/Diamonds";
import Gems from "@features/settings/gems/ui/Gems";
import Parameters from "@features/settings/parameters/ui/Parameters";
import ActionBar from "@shared/ui/ActionBar";
import { TabKeys } from "@pages/settings/constants/tab-keys.ts";
import useActiveTab from "@shared/hooks/useActiveTab.ts";

const items: TabsProps["items"] = [
  {
    key: TabKeys.PRICES,
    label: "Prices",
    children: (
      <Flex vertical gap={20}>
        <MetalPriceLabels />
        <Prices />
      </Flex>
    ),
    icon: <AppstoreOutlined />,
  },
  {
    key: TabKeys.LABOUR,
    label: "Labour",
    children: <Labour />,
    icon: <AppstoreOutlined />,
  },
  {
    key: TabKeys.METALS,
    label: "Metals",
    children: (
      <Flex vertical gap={20}>
        <Metals />
        <AlloyParameters />
      </Flex>
    ),
    icon: <AppstoreOutlined />,
  },
  {
    key: TabKeys.CYLINDERS,
    label: "Cylinders",
    children: <Cylinders />,
    icon: <AppstoreOutlined />,
  },
  {
    key: TabKeys.STONES,
    label: "Stones",
    children: (
      <>
        <Diamonds />
        <Gems />
      </>
    ),
    icon: <AppstoreOutlined />,
  },
  {
    key: TabKeys.PARAMETERS,
    label: "Parameters",
    children: <Parameters />,
    icon: <AppstoreOutlined />,
  },
] as const;

const Settings: FC = () => {
  const { activeTab, setActiveTab } = useActiveTab(TabKeys.PRICES);

  return (
    <div className="page-settings">
      <ActionBar title="Settings" />
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={items}></Tabs>
    </div>
  );
};

export default Settings;
