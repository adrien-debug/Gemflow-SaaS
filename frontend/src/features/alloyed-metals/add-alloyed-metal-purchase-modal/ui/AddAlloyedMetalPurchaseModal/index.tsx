import useCreateAlloyedMetalPurchase from "@entities/alloyed-metal/hooks/useCreateAlloyedMetalPurchase.ts";
import AddAlloyedMetalPurchaseConverter from "@features/alloyed-metals/add-alloyed-metal-purchase-modal/utils/add-alloyed-metal-purchase.converter.ts";
import { AlloyedMetalPurchaseFormSchema } from "@features/alloyed-metals/alloyed-metal-purchase-form/models/alloyed-metal-purchase-form.schema.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Typography from "antd/es/typography";
import { FC, useRef } from "react";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Modal, { ModalProps } from "antd/es/modal";
import AlloyedMetalPurchaseForm, {
  AlloyedMetalPurchaseFormRef,
} from "@features/alloyed-metals/alloyed-metal-purchase-form/ui/AlloyedMetalPurchaseForm";
import { useParams } from "react-router";

interface Props extends ModalProps {
  onClose?: () => void;
}

const AddAlloyedMetalPurchaseModal: FC<Props> = ({ onClose, ...rest }) => {
  const { id } = useParams();
  const { messageApi } = useMessage();
  const formRef = useRef<AlloyedMetalPurchaseFormRef>(null);

  const mutation = useCreateAlloyedMetalPurchase();

  const handleFinish = (values: AlloyedMetalPurchaseFormSchema) => {
    mutation.mutate(AddAlloyedMetalPurchaseConverter.convert(values), {
      onSuccess: () => {
        void messageApi.success("Alloyed metal purchase added successfully");
        onClose?.();
      },
      onError: () => {
        void messageApi.error("Failed to add purchase");
      },
    });
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
          Add alloyed metal purchase
        </Typography.Title>
      }
      confirmLoading={mutation.isPending}
      okText="Add"
      onOk={handleSubmit}
      onCancel={handleCancel}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      destroyOnClose
      {...rest}>
      <AlloyedMetalPurchaseForm onFinish={handleFinish} ref={formRef} alloyedMetalId={Number(id)} />
    </Modal>
  );
};

export default AddAlloyedMetalPurchaseModal;
