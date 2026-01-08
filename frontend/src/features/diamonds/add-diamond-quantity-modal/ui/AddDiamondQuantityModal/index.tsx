import { FC } from "react";
import Modal from "antd/es/modal/Modal";
import { useForm } from "antd/es/form/Form";
import { AddDiamondQuantityForm } from "@features/diamonds/add-diamond-quantity-modal/models/add-diamond-quantity-form.model.ts";
import Form from "antd/es/form";
import InputNumber from "antd/es/input-number";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import useAddDiamondQuantity from "@entities/diamond/hooks/useAddDiamondQuantity.ts";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  open: boolean;
  record: DiamondRecord;
  onClose?: () => void;
}

const AddDiamondQuantityModal: FC<Props> = ({ open, record, onClose }) => {
  const [form] = useForm<AddDiamondQuantityForm>();
  const { messageApi } = useMessage();

  const mutation = useAddDiamondQuantity();

  const handleFinish = (values: AddDiamondQuantityForm) => {
    mutation.mutate(
      { id: record.id, dto: values },
      {
        onSuccess: () => {
          messageApi.success("Diamonds are added successfully");
        },
        onError: () => {
          messageApi.error("Failed to add diamonds");
        },
        onSettled: () => {
          handleCancel();
        },
      },
    );
  };

  const handleCancel = () => {
    onClose?.();
    form.resetFields();
  };

  return (
    <Modal
      width={412}
      open={open}
      centered
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Add diamonds
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      onCancel={handleCancel}
      okText="Add">
      <Form form={form} layout="vertical" requiredMark={false} onFinish={handleFinish}>
        <Form.Item<AddDiamondQuantityForm>
          name="quantity"
          label="Diamonds quantity"
          rules={[FormRule.Required("Please, enter quantity")]}>
          <InputNumber min={1} maxLength={5} placeholder="Enter quantity" size="large" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDiamondQuantityModal;
