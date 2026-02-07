import Flex from "antd/es/flex";
import Button from "antd/es/button";
import { useState } from "react";
import CreateUserModal from "@features/users/create-user-modal/ui/CreateUserModal";

const AddUserButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Flex>
      <Button size="large" type="primary" onClick={() => setIsModalOpen(true)}>
        Add User
      </Button>
      <CreateUserModal open={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </Flex>
  );
};

export default AddUserButton;
