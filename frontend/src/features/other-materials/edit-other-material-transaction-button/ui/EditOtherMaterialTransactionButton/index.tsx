import { OtherMaterialTransaction } from "@entities/other-material/model/other-material-transaction.model.ts";
import EditOtherMaterialTransactionModal from "@features/other-materials/edit-other-material-transaction-modal/ui/EditOtherMaterialTransactionModal";
import { FC, useState } from "react";

interface Props {
  transaction: OtherMaterialTransaction;
}

const EditOtherMaterialTransactionButton: FC<Props> = ({ transaction }) => {
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

      <EditOtherMaterialTransactionModal transaction={transaction} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default EditOtherMaterialTransactionButton;
