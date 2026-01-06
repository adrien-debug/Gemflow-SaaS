import Flex from "antd/es/flex";
import CreateSupplierModal from "@features/suppliers/create-supplier-modal/ui/CreateSupplierModal";
import Button from "antd/es/button";
import { useState } from "react";

const AddSupplierButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Flex>
      <Button size="large" type="primary" onClick={() => setIsModalOpen(true)}>
        Add Supplier
      </Button>
      <CreateSupplierModal open={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Flex>
  );
};

export default AddSupplierButton;
