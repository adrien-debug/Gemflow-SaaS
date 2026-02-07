import useUpdateOtherMaterialTransaction from "@entities/other-material/hooks/useUpdateOtherMaterialTransaction.ts";
import { OtherMaterialTransaction } from "@entities/other-material/model/other-material-transaction.model.ts";
import { OtherMaterialTransactionSchema } from "@features/other-materials/other-material-transaction-form/models/other-material-transaction.schema.ts";
import OtherMaterialTransactionForm from "@features/other-materials/other-material-transaction-form/ui/OtherMaterialTransactionForm";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useForm } from "antd/es/form/Form";
import Typography from "antd/es/typography";
import { FC } from "react";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Modal, { ModalProps } from "antd/es/modal";

interface Props extends ModalProps {
  transaction: OtherMaterialTransaction;
  onClose?: () => void;
}

const EditOtherMaterialTransactionModal: FC<Props> = ({ onClose, open, transaction, ...rest }) => {
  const [form] = useForm();
  const { messageApi } = useMessage();

  const mutation = useUpdateOtherMaterialTransaction();

  const handleFinish = (values: OtherMaterialTransactionSchema) => {
    mutation.mutate(
      {
        id: transaction.id,
        dto: values,
      },
      {
        onSuccess: () => {
          void messageApi.success("Batch updated successfully");
          onClose?.();
        },
        onError: () => {
          void messageApi.error("Failed to update batch");
        },
      },
    );
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <Modal
      width={600}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Edit batch
        </Typography.Title>
      }
      confirmLoading={mutation.isPending}
      okText="Save"
      onOk={handleSubmit}
      onCancel={handleCancel}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      open={open}
      destroyOnClose
      {...rest}>
      <OtherMaterialTransactionForm transaction={transaction} handleFinish={handleFinish} form={form} />
    </Modal>
  );
};

export default EditOtherMaterialTransactionModal;
