import EditMetalWeightModal from "@features/metals/edit-metal-weight/ui/EditMetalWeightModal";
import { FC } from "react";

interface Props {
  open?: boolean;
  onClose?: () => void;
  onSave?: (metalWeight: number) => void;
  initialValue?: number;
}

const EditPureMetalWeightModal: FC<Props> = ({ open, onClose, onSave, initialValue }) => {
  return (
    <EditMetalWeightModal
      initialValue={initialValue}
      open={open}
      onClose={onClose}
      onSave={onSave}
      description="Pure metal weight, g"
    />
  );
};

export default EditPureMetalWeightModal;
