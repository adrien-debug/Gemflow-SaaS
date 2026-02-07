import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Modal from "antd/es/modal/Modal";
import { FC } from "react";
import { useForm } from "antd/es/form/Form";
import { CopyCadDetailsFormFields } from "@features/orders/copy-cad-details-modal/models/copy-cad-details-form.model.ts";
import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import OrderSelect from "@entities/order/ui/OrderSelect";
import useCopyCadDetails from "@entities/order/hooks/useCopyCadDetails.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  open?: boolean;
  onClose?: () => void;
  toOrderId: number;
}

const CopyCadDetailsModal: FC<Props> = ({ open, onClose, toOrderId }) => {
  const [form] = useForm<CopyCadDetailsFormFields>();
  const { messageApi } = useMessage();

  const mutation = useCopyCadDetails();

  const handleCancel = () => {
    onClose?.();
    form.resetFields();
  };

  const handleFinish = (values: CopyCadDetailsFormFields) => {
    mutation.mutate(
      { toOrderId, fromOrderId: values.fromOrderId },
      {
        onSuccess: () => {
          messageApi.success("CAD details copied successfully");
        },
        onError: () => {
          messageApi.error("Failed to copy CAD details");
        },
        onSettled: () => {
          handleCancel();
        },
      },
    );
  };

  return (
    <Modal
      width={430}
      open={open}
      centered
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Copy details from another order
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      onCancel={handleCancel}
      okText="Copy details">
      <Form form={form} layout="vertical" requiredMark={false} onFinish={handleFinish}>
        <Form.Item<CopyCadDetailsFormFields>
          name="fromOrderId"
          label="Order"
          rules={[FormRule.Required("Please, select order")]}>
          <OrderSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CopyCadDetailsModal;
