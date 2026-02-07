import { AlloyedMetal } from "@entities/alloyed-metal/models/alloyed-metal.model";
import UpdateAlloyedMetalModal from "@features/alloyed-metals/update-alloyed-metal-modal/ui/UpdateAlloyedMetalModal";
import { FC, useState } from "react";

interface Props {
  alloyedMetal: AlloyedMetal;
}

const EditAlloyedMetalButton: FC<Props> = ({ alloyedMetal }) => {
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

      <UpdateAlloyedMetalModal alloyedMetal={alloyedMetal} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default EditAlloyedMetalButton;
