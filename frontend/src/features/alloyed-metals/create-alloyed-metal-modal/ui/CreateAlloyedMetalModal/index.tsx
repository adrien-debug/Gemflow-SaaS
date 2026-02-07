import useCreateAlloyedMetal from "@entities/alloyed-metal/hooks/useCreateAlloyedMetal.ts";
import { AlloyedMetalFormSchema } from "@features/alloyed-metals/alloyed-metal-form/model/alloyed-metal-form.schema.ts";
import AlloyedMetalForm, { AlloyedMetalFormRef } from "@features/alloyed-metals/alloyed-metal-form/ui/AlloyedMetalForm";
import { brandingColorPalette } from "@shared/constants/branding";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Modal, { ModalProps } from "antd/es/modal";
import Typography from "antd/es/typography";
import { FC, useRef } from "react";

interface Props extends ModalProps {
  onClose?: () => void;
}

const CreateAlloyedMetalModal: FC<Props> = ({ onClose, ...rest }) => {
  const { mutate, isPending } = useCreateAlloyedMetal();
  const { messageApi } = useMessage();
  const ref = useRef<AlloyedMetalFormRef>(null);

  const handleSubmit = () => ref.current?.submit();

  const handleCancel = () => {
    onClose?.();
  };

  const handleFinish = (data: AlloyedMetalFormSchema) => {
    mutate(data, {
      onSuccess: () => {
        void messageApi.success("Alloyed metal successfully created");
      },
      onError: () => {
        void messageApi.error("Failed to create alloyed metal");
      },
      onSettled: handleCancel,
    });
  };

  return (
    <Modal
      width={400}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Add alloyed metal
        </Typography.Title>
      }
      confirmLoading={isPending}
      onOk={handleSubmit}
      onCancel={handleCancel}
      destroyOnClose
      {...rest}>
      <AlloyedMetalForm onFinish={handleFinish} ref={ref} />
    </Modal>
  );
};

export default CreateAlloyedMetalModal;
