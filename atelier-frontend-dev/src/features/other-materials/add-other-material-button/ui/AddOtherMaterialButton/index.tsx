import AddOtherMaterialModal from "@features/other-materials/add-other-material-modal/ui/AddOtherMaterialModal";
import Button from "antd/es/button";
import { useState } from "react";

const AddOtherMaterialButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setIsOpen(true)}>
        Add material
      </Button>

      <AddOtherMaterialModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AddOtherMaterialButton;
