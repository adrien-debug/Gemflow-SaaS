import { OtherMaterial } from "@entities/other-material/model/other-material.model.ts";
import UpdateOtherMaterialModal from "@features/other-materials/update-other-material-modal/ui/UpdateOtherMaterialModal";
import { FC, useState } from "react";

interface Props {
  otherMaterial: OtherMaterial;
}

const EditOtherMaterialButton: FC<Props> = ({ otherMaterial }) => {
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

      <UpdateOtherMaterialModal otherMaterial={otherMaterial} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default EditOtherMaterialButton;
