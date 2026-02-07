import useCreateAlloyPurchase from "@entities/alloy/hooks/useCreateAlloyPurchase.ts";
import AddAlloyPurchaseConverter from "@features/alloys/add-alloy-purchase-modal/utils/add-alloy-purchase.converter.ts";
import { AlloyPurchaseFormSchema } from "@features/alloys/alloy-purchase-form/models/alloy-purchase-form.schema.ts";
import AlloyPurchaseForm, { AlloyPurchaseFormRef } from "@features/alloys/alloy-purchase-form/ui/AlloyPurchaseForm";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Typography from "antd/es/typography";
import { FC, useRef, useState } from "react";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Modal, { ModalProps } from "antd/es/modal";
import { useParams } from "react-router";

interface Props extends ModalProps {
  onClose?: () => void;
}

const AddAlloyPurchaseModal: FC<Props> = ({ onClose, ...rest }) => {
  const [fileLoading, setFileLoading] = useState(false);
  const { messageApi } = useMessage();
  const formRef = useRef<AlloyPurchaseFormRef>(null);
  const { id } = useParams();

  const mutation = useCreateAlloyPurchase();

  const handleFinish = (values: AlloyPurchaseFormSchema) => {
    mutation.mutate(AddAlloyPurchaseConverter.convert(values), {
      onSuccess: () => {
        void messageApi.success("Alloy purchase added successfully");
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
          Add alloy purchase
        </Typography.Title>
      }
      confirmLoading={fileLoading || mutation.isPending}
      okText="Add"
      onOk={handleSubmit}
      onCancel={handleCancel}
      cancelButtonProps={{
        disabled: fileLoading || mutation.isPending,
      }}
      destroyOnClose
      {...rest}>
      <AlloyPurchaseForm
        alloyId={Number(id)}
        onFinish={handleFinish}
        ref={formRef}
        onStartFileLoad={() => setFileLoading(true)}
        onFinishFileLoad={() => setFileLoading(false)}
      />
    </Modal>
  );
};

export default AddAlloyPurchaseModal;
