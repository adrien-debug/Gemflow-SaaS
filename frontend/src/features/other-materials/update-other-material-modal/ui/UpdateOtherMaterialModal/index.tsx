import useUpdateOtherMaterial from "@entities/other-material/hooks/useUpdateOtherMaterial.ts";
import { OtherMaterial } from "@entities/other-material/model/other-material.model";
import { OtherMaterialFormSchema } from "@features/other-materials/other-material-form/models/other-material-form.schema.ts";
import OtherMaterialForm, {
  OtherMaterialFormRef,
} from "@features/other-materials/other-material-form/ui/OtherMaterialForm";
import { brandingColorPalette } from "@shared/constants/branding";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { Modal, ModalProps, Typography } from "antd";
import { FC, useRef } from "react";

interface Props extends ModalProps {
  otherMaterial: OtherMaterial;
  onClose?: () => void;
}

const UpdateOtherMaterialModal: FC<Props> = ({ otherMaterial, onClose, ...rest }) => {
  const ref = useRef<OtherMaterialFormRef>(null);
  const { mutate, isPending } = useUpdateOtherMaterial();
  const { messageApi } = useMessage();

  const handleFinish = (data: OtherMaterialFormSchema) => {
    if (otherMaterial.id) {
      mutate(
        { id: otherMaterial.id, dto: data },
        {
          onSuccess: () => {
            void messageApi.success("Material successfully changed");
          },
          onError: () => {
            void messageApi.error("Failed to change material");
          },
          onSettled: handleCancel,
        },
      );
    }
  };

  const handleSubmit = () => ref.current?.submit();

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <Modal
      width={400}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Edit material
        </Typography.Title>
      }
      onOk={handleSubmit}
      confirmLoading={isPending}
      cancelButtonProps={{
        disabled: isPending,
      }}
      onCancel={handleCancel}
      destroyOnClose
      {...rest}>
      <OtherMaterialForm otherMaterial={otherMaterial} onFinish={handleFinish} ref={ref} />
    </Modal>
  );
};

export default UpdateOtherMaterialModal;
