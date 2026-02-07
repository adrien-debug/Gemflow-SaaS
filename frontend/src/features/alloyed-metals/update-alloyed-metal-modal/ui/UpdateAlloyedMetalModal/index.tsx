import useUpdateAlloyedMetal from "@entities/alloyed-metal/hooks/useUpdateAlloyedMetal.ts";
import { AlloyedMetal } from "@entities/alloyed-metal/models/alloyed-metal.model.ts";
import { AlloyedMetalFormSchema } from "@features/alloyed-metals/alloyed-metal-form/model/alloyed-metal-form.schema.ts";
import AlloyedMetalForm, { AlloyedMetalFormRef } from "@features/alloyed-metals/alloyed-metal-form/ui/AlloyedMetalForm";
import { brandingColorPalette } from "@shared/constants/branding";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Modal, { ModalProps } from "antd/es/modal";
import Typography from "antd/es/typography";
import { FC, useRef } from "react";

interface Props extends ModalProps {
  alloyedMetal: AlloyedMetal;
  onClose?: () => void;
}

const UpdateAlloyedMetalModal: FC<Props> = ({ alloyedMetal, onClose, ...rest }) => {
  const ref = useRef<AlloyedMetalFormRef>(null);
  const { mutate, isPending } = useUpdateAlloyedMetal();
  const { messageApi } = useMessage();

  const handleFinish = (data: AlloyedMetalFormSchema) => {
    mutate(
      { id: alloyedMetal.id, dto: data },
      {
        onSuccess: () => {
          void messageApi.success("Alloyed metal successfully changed");
        },
        onError: () => {
          void messageApi.error("Failed to change alloyed metal");
        },
        onSettled: handleCancel,
      },
    );
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
          Edit alloyed metal
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
      <AlloyedMetalForm alloyedMetal={alloyedMetal} onFinish={handleFinish} ref={ref} />
    </Modal>
  );
};

export default UpdateAlloyedMetalModal;
