import useUpdateAlloy from "@entities/alloy/hooks/useUpdateAlloy.ts";
import { Alloy } from "@entities/alloy/models/alloy.model";
import { AlloyFormSchema } from "@features/alloys/alloy-form/model/alloy-form.schema";
import AlloyForm, { AlloyFormRef } from "@features/alloys/alloy-form/ui/AlloyForm";
import { brandingColorPalette } from "@shared/constants/branding";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Modal, { ModalProps } from "antd/es/modal";
import Typography from "antd/es/typography";
import { FC, useRef } from "react";

interface Props extends ModalProps {
  alloy: Alloy;
  onClose?: () => void;
}

const UpdateAlloyModal: FC<Props> = ({ alloy, onClose, ...rest }) => {
  const ref = useRef<AlloyFormRef>(null);
  const { mutate, isPending } = useUpdateAlloy();
  const { messageApi } = useMessage();

  const handleFinish = (data: AlloyFormSchema) => {
    mutate(
      { id: alloy.id, dto: data },
      {
        onSuccess: () => {
          void messageApi.success("Alloy is successfully updated");
        },
        onError: () => {
          void messageApi.error("Failed to update alloy");
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
          Edit alloy
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
      <AlloyForm alloy={alloy} onFinish={handleFinish} ref={ref} />
    </Modal>
  );
};

export default UpdateAlloyModal;
