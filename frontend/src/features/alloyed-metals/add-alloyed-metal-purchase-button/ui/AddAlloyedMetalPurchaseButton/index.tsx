import AddAlloyedMetalPurchaseModal from "@features/alloyed-metals/add-alloyed-metal-purchase-modal/ui/AddAlloyedMetalPurchaseModal";
import Button from "antd/es/button";
import { useState } from "react";

const AddAlloyedMetalPurchaseButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setOpen(true)}>
        Add purchase
      </Button>

      <AddAlloyedMetalPurchaseModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AddAlloyedMetalPurchaseButton;
