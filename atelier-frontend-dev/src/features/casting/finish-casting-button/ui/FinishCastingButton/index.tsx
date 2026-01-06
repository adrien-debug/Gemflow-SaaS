import Button from "antd/es/button";
import { FC, useState } from "react";
import { useForm } from "antd/es/form/Form";
import FinishCastingModal from "@features/casting/finish-casting-modal/ui/FinishCastingModal";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";

interface Props {
  metal?: BaseItem;
  metalPurity?: MetalPurity;
  castingId?: number;
  reuseWeight?: number;
}

const FinishCastingButton: FC<Props> = ({ metal, metalPurity, castingId, reuseWeight }) => {
  const [openModal, setOpenModal] = useState(false);

  const [form] = useForm();

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  return (
    <>
      <Button className="finish-casting-button" size="large" type="primary" onClick={() => setOpenModal(true)}>
        Finish casting
      </Button>
      <FinishCastingModal
        openModal={openModal}
        form={form}
        handleCancel={handleCancel}
        metalPurity={metalPurity}
        metal={metal}
        castingId={castingId}
        reuseWeight={reuseWeight}
      />
    </>
  );
};
export default FinishCastingButton;
