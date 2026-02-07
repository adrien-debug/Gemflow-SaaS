import Flex from "antd/es/flex";
import { LabourProvider } from "@features/settings/labour/context/LabourContext.tsx";
import LabourCost from "@features/settings/labour-cost/ui/LabourCost";
import SettingCost from "@features/settings/setting-cost/ui/SettingCost";

const Labour = () => (
  <LabourProvider>
    <Flex vertical>
      <LabourCost />
      <SettingCost />
    </Flex>
  </LabourProvider>
);

export default Labour;
