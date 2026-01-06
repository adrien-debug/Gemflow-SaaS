import { FC, useRef, useState } from "react";
import { useMessage } from "@shared/hooks/useMessage.ts";
import PureMetalPurchaseForm, {
  PureMetalPurchaseFormRef,
} from "@features/metals/pure-metal-purchase-form/ui/PureMetalPurchaseForm";
import { MetalPurchaseSchema } from "@features/metals/pure-metal-purchase-form/models/metal-purchase.schema.ts";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";
import useUpdatePureMetalPurchase from "@entities/metal/hooks/useUpdatePureMetalPurchase.ts";
import EditMetalPurchaseConverter from "@features/metals/edit-metal-purchase-modal/utils/edit-metal-purchase.converter.ts";

interface Props {
  onClose?: () => void;
  open?: boolean;
  purchase: PureMetalPurchase;
}

const EditMetalPurchaseModal: FC<Props> = ({ onClose, open, purchase }) => {
  const [fileLoading, setFileLoading] = useState(false);
  const { messageApi } = useMessage();
  const formRef = useRef<PureMetalPurchaseFormRef>(null);

  const mutation = useUpdatePureMetalPurchase();

  const handleFinish = (values: MetalPurchaseSchema) => {
    mutation.mutate(
      { id: purchase.id, dto: EditMetalPurchaseConverter.convert(values) },
      {
        onSuccess: () => {
          void messageApi.success("Metal purchase updated successfully");
        },
        onError: () => {
          void messageApi.error("Failed to update metal purchase");
        },
        onSettled: () => {
          handleCancel();
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
          Edit metal purchase
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
      destroyOnClose>
      <PureMetalPurchaseForm
        onFinish={handleFinish}
        purchase={purchase}
        ref={formRef}
        onStartFileLoad={() => setFileLoading(true)}
        onFinishFileLoad={() => setFileLoading(false)}
      />
    </Modal>
  );
};

export default EditMetalPurchaseModal;
