import PrintingList from "@features/3d-printing/3d-printing-list/ui/PrintingList";
import ActionBar from "@shared/ui/ActionBar";
import PageHero from "@shared/ui/PageHero";
import Flex from "antd/es/flex";
import { PrinterOutlined } from "@ant-design/icons";
import "./styles.scss";

const Printing = () => {
  return (
    <Flex vertical className="printing">
      <PageHero
        icon={<PrinterOutlined />}
        badge="Pre-Production"
        title="3D Printing"
        subtitle="Manage 3D printing jobs for wax models and prototypes"
      />
      <ActionBar title="3D Printing" />

      <PrintingList />
    </Flex>
  );
};

export default Printing;
