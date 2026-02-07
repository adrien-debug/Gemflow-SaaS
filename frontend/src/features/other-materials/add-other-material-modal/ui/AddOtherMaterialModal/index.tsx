import useCreateOtherMaterial from "@entities/other-material/hooks/useCreateOtherMaterial.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Typography from "antd/es/typography";
import { FC, useRef } from "react";
import Modal, { ModalProps } from "antd/es/modal";
import { useMessage } from "@shared/hooks/useMessage.ts";
import OtherMaterialForm, {
  OtherMaterialFormRef,
} from "@features/other-materials/other-material-form/ui/OtherMaterialForm";

interface Props extends ModalProps {
  open: boolean;
  onClose?: () => void;
}

const AddOtherMaterialModal: FC<Props> = ({ onClose, open, ...rest }) => {
  const { messageApi } = useMessage();
  const ref = useRef<OtherMaterialFormRef>(null);

  const mutation = useCreateOtherMaterial();

  const handleSubmit = () => ref.current?.submit();

  const handleFinish = (value: { name: string }) => {
    mutation.mutate(value, {
      onSuccess: (value) => {
        void messageApi.success(`Material ${value.name} created successfully.`);
      },
      onError: () => {
        void messageApi.error("Failed to add new material");
      },
      onSettled: () => {
        onClose?.();
      },
    });
  };

  return (
    <Modal
      width={400}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Add material
        </Typography.Title>
      }
      okText="Add"
      onOk={handleSubmit}
      onCancel={onClose}
      open={open}
      destroyOnClose
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      {...rest}>
      <OtherMaterialForm onFinish={handleFinish} ref={ref} />
    </Modal>
  );
};

export default AddOtherMaterialModal;
