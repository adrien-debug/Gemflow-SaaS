import { AlloyedMetalPurchase } from "@entities/alloyed-metal/models/alloyed-metal-purchase.model.ts";
import EditAlloyedMetalPurchaseModal from "@features/alloyed-metals/edit-alloyed-metal-purchase-modal/ui/EditAlloyedMetalPurchaseModal";
import { FC, useState } from "react";

interface Props {
  purchase: AlloyedMetalPurchase;
}

const EditAlloyedMetalPurchaseButton: FC<Props> = ({ purchase }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(true);
  };

  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        style={{ width: "100%", height: "100%" }}
        onClick={handleEdit}>
        Edit
      </a>

      <EditAlloyedMetalPurchaseModal purchase={purchase} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default EditAlloyedMetalPurchaseButton;
