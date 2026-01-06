import EditMetalWeightModal from "@features/metals/edit-metal-weight/ui/EditMetalWeightModal";
import { FC } from "react";

interface Props {
  open?: boolean;
  onClose?: () => void;
  onSave?: (metalWeight: number) => void;
  initialValue?: number;
}

const EditAlloyMetalWeightModal: FC<Props> = ({ open, onClose, onSave, initialValue }) => {
  return (
    <EditMetalWeightModal
      initialValue={initialValue}
      open={open}
      onClose={onClose}
      onSave={onSave}
      description="Alloy weight, g"
    />
  );
};

export default EditAlloyMetalWeightModal;
