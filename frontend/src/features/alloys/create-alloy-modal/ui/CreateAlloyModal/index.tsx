import useCreateAlloy from "@entities/alloy/hooks/useCreateAlloy.ts";
import { AlloyFormSchema } from "@features/alloys/alloy-form/model/alloy-form.schema";
import AlloyForm, { AlloyFormRef } from "@features/alloys/alloy-form/ui/AlloyForm";
import { brandingColorPalette } from "@shared/constants/branding";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Modal, { ModalProps } from "antd/es/modal";
import Typography from "antd/es/typography";
import { FC, useRef } from "react";

interface Props extends ModalProps {
  onClose?: () => void;
}

const CreateAlloyModal: FC<Props> = ({ onClose, ...rest }) => {
  const { mutate, isPending } = useCreateAlloy();
  const { messageApi } = useMessage();
  const ref = useRef<AlloyFormRef>(null);

  const handleSubmit = () => ref.current?.submit();

  const handleCancel = () => {
    onClose?.();
  };

  const handleFinish = (data: AlloyFormSchema) => {
    mutate(data, {
      onSuccess: () => {
        void messageApi.success("Alloy successfully created");
      },
      onError: () => {
        void messageApi.error("Failed to create alloy");
      },
      onSettled: handleCancel,
    });
  };

  return (
    <Modal
      width={400}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Add alloy
        </Typography.Title>
      }
      confirmLoading={isPending}
      cancelButtonProps={{
        disabled: isPending,
      }}
      onOk={handleSubmit}
      onCancel={handleCancel}
      destroyOnClose
      {...rest}>
      <AlloyForm onFinish={handleFinish} ref={ref} />
    </Modal>
  );
};

export default CreateAlloyModal;
