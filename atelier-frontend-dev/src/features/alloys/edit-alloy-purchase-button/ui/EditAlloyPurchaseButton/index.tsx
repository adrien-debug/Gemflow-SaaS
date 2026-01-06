import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model";
import EditAlloyPurchaseModal from "@features/alloys/edit-alloy-purchase-modal/ui/EditAlloyPurchaseModal";
import { FC, useState } from "react";

interface Props {
  purchase: AlloyPurchase;
}

const EditAlloyPurchaseButton: FC<Props> = ({ purchase }) => {
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

      <EditAlloyPurchaseModal purchase={purchase} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default EditAlloyPurchaseButton;
