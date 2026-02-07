import useUpdateAlloyPurchase from "@entities/alloy/hooks/useUpdateAlloyPurchase.ts";
import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import { AlloyPurchaseFormSchema } from "@features/alloys/alloy-purchase-form/models/alloy-purchase-form.schema.ts";
import AlloyPurchaseForm, { AlloyPurchaseFormRef } from "@features/alloys/alloy-purchase-form/ui/AlloyPurchaseForm";
import EditAlloyPurchaseConverter from "@features/alloys/edit-alloy-purchase-modal/utils/edit-alloy-purchase.converter.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Typography from "antd/es/typography";
import { FC, useRef, useState } from "react";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Modal, { ModalProps } from "antd/es/modal";
import { useParams } from "react-router";

interface Props extends ModalProps {
  purchase: AlloyPurchase;
  onClose?: () => void;
}

const EditAlloyPurchaseModal: FC<Props> = ({ onClose, purchase, open, ...rest }) => {
  const [fileLoading, setFileLoading] = useState(false);
  const { messageApi } = useMessage();
  const formRef = useRef<AlloyPurchaseFormRef>(null);
  const { id } = useParams();

  const mutation = useUpdateAlloyPurchase();

  const handleFinish = (values: AlloyPurchaseFormSchema) => {
    mutation.mutate(
      {
        id: purchase.id,
        dto: EditAlloyPurchaseConverter.convert(values),
      },
      {
        onSuccess: () => {
          void messageApi.success("Alloy purchase updated successfully");
          onClose?.();
        },
        onError: () => {
          void messageApi.error("Failed to update alloy purchase");
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
      confirmLoading={fileLoading || mutation.isPending}
      okText="Save"
      onOk={handleSubmit}
      onCancel={handleCancel}
      cancelButtonProps={{
        disabled: fileLoading || mutation.isPending,
      }}
      open={open}
      destroyOnClose
      {...rest}>
      <AlloyPurchaseForm
        alloyId={Number(id)}
        onFinish={handleFinish}
        purchase={purchase}
        ref={formRef}
        onStartFileLoad={() => setFileLoading(true)}
        onFinishFileLoad={() => setFileLoading(false)}
      />
    </Modal>
  );
};

export default EditAlloyPurchaseModal;
