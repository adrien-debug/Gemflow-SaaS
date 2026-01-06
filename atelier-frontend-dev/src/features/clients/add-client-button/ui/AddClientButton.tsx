import Flex from "antd/es/flex";
import CreateClientModal from "@features/clients/create-client-modal/ui/CreateClientModal";
import Button from "antd/es/button";
import { useState } from "react";

const AddClientButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Flex>
      <Button size="large" type="primary" onClick={() => setIsModalOpen(true)}>
        Add Client
      </Button>
      <CreateClientModal open={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Flex>
  );
};

export default AddClientButton;
