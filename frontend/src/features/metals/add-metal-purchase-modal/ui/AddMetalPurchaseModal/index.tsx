import { MetalPurchaseSchema } from "@features/metals/pure-metal-purchase-form/models/metal-purchase.schema.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Typography from "antd/es/typography";
import { FC, useRef, useState } from "react";
import useCreatePureMetalPurchase from "@entities/metal/hooks/useCreatePureMetalPurchase.ts";
import AddMetalPurchaseConverter from "@features/metals/add-metal-purchase-modal/utils/add-metal-purchase.converter.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import PureMetalPurchaseForm, {
  PureMetalPurchaseFormRef,
} from "@features/metals/pure-metal-purchase-form/ui/PureMetalPurchaseForm";
import { PureMetalSummary } from "@entities/metal/models/pure-metals-summary.model.ts";
import Modal, { ModalProps } from "antd/es/modal";

interface Props extends ModalProps {
  onClose?: () => void;
  pureMetalSummary?: PureMetalSummary;
}

const AddMetalPurchaseModal: FC<Props> = ({ onClose, pureMetalSummary, ...rest }) => {
  const [fileLoading, setFileLoading] = useState(false);
  const { messageApi } = useMessage();
  const formRef = useRef<PureMetalPurchaseFormRef>(null);

  const mutation = useCreatePureMetalPurchase();

  const handleFinish = (values: MetalPurchaseSchema) => {
    mutation.mutate(AddMetalPurchaseConverter.convert(values), {
      onSuccess: () => {
        void messageApi.success("Metal purchase added successfully");
      },
      onError: () => {
        void messageApi.error("Failed to add metal purchase");
      },
      onSettled: () => {
        handleCancel();
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
          Add metal purchase
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
      <PureMetalPurchaseForm
        pureMetalSummary={pureMetalSummary}
        onFinish={handleFinish}
        ref={formRef}
        onStartFileLoad={() => setFileLoading(true)}
        onFinishFileLoad={() => setFileLoading(false)}
      />
    </Modal>
  );
};

export default AddMetalPurchaseModal;
