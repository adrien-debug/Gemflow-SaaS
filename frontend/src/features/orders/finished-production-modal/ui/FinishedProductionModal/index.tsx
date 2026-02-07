import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { FC } from "react";
import { useForm } from "antd/es/form/Form";
import Form from "antd/es/form";
import LocationSelector from "@entities/location/ui/LocationSelector";
import { FormRule } from "@shared/utils/form-validators.ts";
import { useNavigate } from "react-router";
import useFinishOrder from "@entities/order/hooks/useFinishOrder.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { ApiError } from "@shared/types/api-error.type.ts";

interface Props {
  open: boolean;
  setIsModalOpen: (item: boolean) => void;
  orderId?: number;
}

const FinishedProductionModal: FC<Props> = ({ open, setIsModalOpen, orderId }) => {
  const [form] = useForm();
  const navigate = useNavigate();
  const mutation = useFinishOrder();
  const { messageApi } = useMessage();

  const onClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFinish = ({ locationId }: { locationId: number }) => {
    mutation.mutate(
      { orderId: orderId as number, locationId },
      {
        onSuccess: () => {
          void messageApi.success("The order was moved to stock");
          navigate(`/stock/${orderId}`);
        },
        onError: (error: ApiError) => {
          void messageApi.error(error.data?.friendlyMessage || "Failed to move the order to stock");
        },
        onSettled: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      onOk={form.submit}
      onCancel={onClose}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Production finished
        </Typography.Title>
      }
      okText="Confirm"
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      centered
      destroyOnClose
      width={412}>
      <Form form={form} requiredMark={false} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="locationId"
          label="Stock location"
          rules={[FormRule.Required("Please, choose location")]}
          style={{ width: "100%" }}>
          <LocationSelector />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FinishedProductionModal;
