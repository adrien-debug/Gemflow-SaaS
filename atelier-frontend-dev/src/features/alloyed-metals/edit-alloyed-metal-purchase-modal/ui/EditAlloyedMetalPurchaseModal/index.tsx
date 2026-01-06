import useUpdateAlloyedMetalPurchase from "@entities/alloyed-metal/hooks/useUpdateAlloyedMetalPurchase.ts";
import { AlloyedMetalPurchase } from "@entities/alloyed-metal/models/alloyed-metal-purchase.model.ts";
import { AlloyedMetalPurchaseFormSchema } from "@features/alloyed-metals/alloyed-metal-purchase-form/models/alloyed-metal-purchase-form.schema.ts";
import AlloyedMetalPurchaseForm, {
  AlloyedMetalPurchaseFormRef,
} from "@features/alloyed-metals/alloyed-metal-purchase-form/ui/AlloyedMetalPurchaseForm";
import EditAlloyedMetalPurchaseConverter from "@features/alloyed-metals/edit-alloyed-metal-purchase-modal/utils/edit-alloyed-metal-purchase.converter.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Typography from "antd/es/typography";
import { FC, useRef } from "react";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Modal, { ModalProps } from "antd/es/modal";

interface Props extends ModalProps {
  purchase: AlloyedMetalPurchase;
  onClose?: () => void;
}

const EditAlloyedMetalPurchaseModal: FC<Props> = ({ onClose, purchase, ...rest }) => {
  const { messageApi } = useMessage();
  const formRef = useRef<AlloyedMetalPurchaseFormRef>(null);

  const mutation = useUpdateAlloyedMetalPurchase();

  const handleFinish = (values: AlloyedMetalPurchaseFormSchema) => {
    mutation.mutate(
      {
        id: purchase.id,
        dto: EditAlloyedMetalPurchaseConverter.convert(values),
      },
      {
        onSuccess: () => {
          void messageApi.success("Alloyed metal purchase updated successfully");
          onClose?.();
        },
        onError: () => {
          void messageApi.error("Failed to update alloyed metal purchase");
        },
      },
    );
  };

  const handleSubmit = () => {
    formRef.current?.submit();
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <Modal
      width={600}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Edit alloy purchase
        </Typography.Title>
      }
      confirmLoading={mutation.isPending}
      okText="Save"
      onOk={handleSubmit}
      onCancel={handleCancel}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      destroyOnClose
      {...rest}>
      <AlloyedMetalPurchaseForm onFinish={handleFinish} purchase={purchase} ref={formRef} />
    </Modal>
  );
};

export default EditAlloyedMetalPurchaseModal;
