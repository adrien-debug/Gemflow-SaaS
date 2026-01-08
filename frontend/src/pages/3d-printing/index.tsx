import PrintingList from "@features/3d-printing/3d-printing-list/ui/PrintingList";
import ActionBar from "@shared/ui/ActionBar";
import Flex from "antd/es/flex";
import "./styles.scss";

const Printing = () => {
  return (
    <Flex vertical className="printing">
      <ActionBar title="3D Printing" />

      <PrintingList />
    </Flex>
  );
};

export default Printing;
