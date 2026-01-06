import CreateAlloyModal from "@features/alloys/create-alloy-modal/ui/CreateAlloyModal";
import Button from "antd/es/button";
import { useState } from "react";

const CreateAlloyButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setIsOpen(true)}>
        Add alloy
      </Button>

      <CreateAlloyModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CreateAlloyButton;
