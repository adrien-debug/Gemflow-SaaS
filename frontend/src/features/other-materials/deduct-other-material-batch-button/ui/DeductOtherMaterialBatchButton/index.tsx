import { FC, useState } from "react";
import Button from "antd/es/button";
import DeductOtherMaterialBatchModal from "@features/other-materials/deduct-other-material-batch-modal/ui/DeductOtherMaterialBatchModal";

const DeductOtherMaterialButton: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="large" onClick={() => setOpen(true)}>
        Deduct
      </Button>

      <DeductOtherMaterialBatchModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default DeductOtherMaterialButton;
