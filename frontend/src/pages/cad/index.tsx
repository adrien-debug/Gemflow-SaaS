import Flex from "antd/es/flex";
import ActionBar from "@shared/ui/ActionBar";
import PageHero from "@shared/ui/PageHero";
import CadList from "@features/cad/cad-list/ui/CadList";
import { ToolOutlined } from "@ant-design/icons";
import "./styles.scss";

const CAD = () => {
  return (
    <Flex vertical className="cad">
      <PageHero
        icon={<ToolOutlined />}
        badge="Pre-Production"
        title="CAD Design"
        subtitle="Computer-aided design workspace for creating and reviewing jewelry models"
      />
      <ActionBar title="CAD" />

      <CadList />
    </Flex>
  );
};

export default CAD;
