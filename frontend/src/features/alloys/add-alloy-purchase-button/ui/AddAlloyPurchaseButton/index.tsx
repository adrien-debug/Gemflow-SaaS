import AddAlloyPurchaseModal from "@features/alloys/add-alloy-purchase-modal/ui/AddAlloyPurchaseModal";
import Button from "antd/es/button";
import { useState } from "react";

const AddAlloyPurchaseButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setOpen(true)}>
        Add purchase
      </Button>

      <AddAlloyPurchaseModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AddAlloyPurchaseButton;
