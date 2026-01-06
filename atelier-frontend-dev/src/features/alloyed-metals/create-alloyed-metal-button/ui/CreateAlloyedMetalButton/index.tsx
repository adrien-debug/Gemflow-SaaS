import CreateAlloyedMetalModal from "@features/alloyed-metals/create-alloyed-metal-modal/ui/CreateAlloyedMetalModal";
import Button from "antd/es/button";
import { useState } from "react";

const CreateAlloyedMetalButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setIsOpen(true)}>
        Add alloyed metal
      </Button>

      <CreateAlloyedMetalModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CreateAlloyedMetalButton;
