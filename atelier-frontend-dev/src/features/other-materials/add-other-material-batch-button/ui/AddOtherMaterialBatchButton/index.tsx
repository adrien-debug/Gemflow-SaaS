import { useState } from "react";
import AddOtherMaterialBatchModal from "@features/other-materials/add-other-material-batch-modal/ui/AddOtherMaterialBatchModal";
import Button from "antd/es/button";

const AddOtherMaterialBatchButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setOpen(true)}>
        Add
      </Button>

      <AddOtherMaterialBatchModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AddOtherMaterialBatchButton;
