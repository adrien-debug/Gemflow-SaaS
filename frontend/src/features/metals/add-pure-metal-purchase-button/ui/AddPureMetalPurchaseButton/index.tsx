import AddMetalPurchaseModal from "@features/metals/add-metal-purchase-modal/ui/AddMetalPurchaseModal";
import Button from "antd/es/button";
import { FC, useState } from "react";
import { PureMetalSummary } from "@entities/metal/models/pure-metals-summary.model.ts";

interface Props {
  pureMetalSummary?: PureMetalSummary;
}

const AddPureMetalPurchaseButton: FC<Props> = ({ pureMetalSummary }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setOpen(true)}>
        Add purchase
      </Button>

      <AddMetalPurchaseModal open={open} onClose={() => setOpen(false)} pureMetalSummary={pureMetalSummary} />
    </>
  );
};

export default AddPureMetalPurchaseButton;
