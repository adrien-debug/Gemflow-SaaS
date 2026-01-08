import useDeductOtherMaterialBatch from "@entities/other-material/hooks/useDeductOtherMaterialBatch.ts";
import OtherMaterialTransactionDtoConverter from "@entities/other-material/utils/other-material-transaction-dto.converter.tsx";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { FC } from "react";
import Modal from "antd/es/modal/Modal";
import { useForm } from "antd/es/form/Form";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { OtherMaterialTransactionSchema } from "@features/other-materials/other-material-transaction-form/models/other-material-transaction.schema";
import OtherMaterialTransactionForm from "@features/other-materials/other-material-transaction-form/ui/OtherMaterialTransactionForm";
import { useParams } from "react-router";

interface Props {
  open: boolean;
  onClose?: () => void;
}

const DeductOtherMaterialBatchModal: FC<Props> = ({ open, onClose }) => {
  const { id } = useParams();
  const [form] = useForm<OtherMaterialTransactionSchema>();
  const { messageApi } = useMessage();
  const mutation = useDeductOtherMaterialBatch();

  const handleFinish = (values: OtherMaterialTransactionSchema) => {
    mutation.mutate(
      OtherMaterialTransactionDtoConverter.convert({
        otherMaterialId: Number(id),
        ...values,
      }),
      {
        onSuccess: () => {
          void messageApi.success("Material successfully deducted");
        },
        onError: () => {
          void messageApi.error("Failed to deduct material");
        },
        onSettled: handleCancel,
      },
    );
  };

  const handleCancel = () => {
    form.resetFields();
    onClose?.();
  };

  return (
    <Modal
      width={412}
      open={open}
      centered
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Deduct material batch
        </Typography.Title>
      }
      onOk={form.submit}
      onCancel={handleCancel}
      okText="Deduct">
      <OtherMaterialTransactionForm handleFinish={handleFinish} form={form} />
    </Modal>
  );
};

export default DeductOtherMaterialBatchModal;
