import AlloyedMetals from "@features/alloyed-metals/alloyed-metals/ui/AlloyedMetals";
import Alloys from "@features/alloys/alloys/ui/Alloys";
import MetalsHeader from "@features/metals/metals-header/ui/MetalsHeader";
import PureMetals from "@features/metals/pure-metals/ui/PureMetals";
import Flex from "antd/es/flex";
import Tabs from "antd/es/tabs";
import OtherMaterials from "features/other-materials/other-materials/ui/OtherMaterials";
import useActiveTab from "@shared/hooks/useActiveTab.ts";
import { TabKeys } from "@pages/metals/constants/tab-keys.ts";

const MetalsListPage = () => {
  const { activeTab, setActiveTab } = useActiveTab(TabKeys.PURE_METALS);

  return (
    <Flex vertical style={{ height: "100%", paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
      <MetalsHeader />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: TabKeys.PURE_METALS,
            label: "Pure metals",
            children: <PureMetals />,
          },
          {
            key: TabKeys.ALLOYS,
            label: "Alloys",
            children: <Alloys />,
          },
          {
            key: TabKeys.ALLOYED_METALS,
            label: "Alloyed metals",
            children: <AlloyedMetals />,
          },
          {
            key: TabKeys.OTHER,
            label: "Other",
            children: <OtherMaterials />,
          },
        ]}
      />
    </Flex>
  );
};

export default MetalsListPage;
