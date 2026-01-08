import { FC } from "react";
import Modal from "antd/es/modal/Modal";
import { useForm } from "antd/es/form/Form";
import Form from "antd/es/form";
import InputNumber from "antd/es/input-number";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { DeductDiamondQuantityForm } from "@features/diamonds/deduct-diamond-quantity-modal/models/deduct-diamond-quantity-form.model.ts";
import useDeductDiamondQuantity from "@entities/diamond/hooks/useDeductDiamondQuantity.ts";

interface Props {
  open: boolean;
  record: DiamondRecord;
  onClose?: () => void;
}

const DeductDiamondQuantityModal: FC<Props> = ({ open, record, onClose }) => {
  const [form] = useForm<DeductDiamondQuantityForm>();
  const { messageApi } = useMessage();

  const mutation = useDeductDiamondQuantity();

  const handleFinish = (values: DeductDiamondQuantityForm) => {
    mutation.mutate(
      { id: record.id, dto: values },
      {
        onSuccess: () => {
          messageApi.success("Diamonds are deducted successfully");
        },
        onError: () => {
          messageApi.error("Failed to deduct diamonds");
        },
        onSettled: () => {
          onClose?.();
          form.resetFields();
        },
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
          Deduct diamonds
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      onCancel={handleCancel}
      okText="Deduct">
      <Form form={form} layout="vertical" requiredMark={false} onFinish={handleFinish}>
        <Form.Item<DeductDiamondQuantityForm>
          name="quantity"
          label="Diamonds quantity"
          rules={[FormRule.Required("Please, enter quantity")]}>
          <InputNumber
            min={1}
            max={record?.quantity}
            maxLength={5}
            placeholder="Enter quantity"
            size="large"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeductDiamondQuantityModal;
