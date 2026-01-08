import { Alloy } from "@entities/alloy/models/alloy.model.ts";
import UpdateAlloyModal from "@features/alloys/update-alloy-modal/ui/UpdateAlloyModal";
import { FC, useState } from "react";

interface Props {
  alloy: Alloy;
}

const EditAlloyButton: FC<Props> = ({ alloy }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        style={{ width: "100%", height: "100%" }}
        onClick={() => setIsOpen(true)}>
        Edit
      </a>

      <UpdateAlloyModal alloy={alloy} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default EditAlloyButton;
