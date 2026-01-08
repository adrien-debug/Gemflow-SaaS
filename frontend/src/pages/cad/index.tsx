import Flex from "antd/es/flex";
import ActionBar from "@shared/ui/ActionBar";
import CadList from "@features/cad/cad-list/ui/CadList";
import "./styles.scss";

const CAD = () => {
  return (
    <Flex vertical className="cad">
      <ActionBar title="CAD" />

      <CadList />
    </Flex>
  );
};

export default CAD;
