import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Modal from "antd/es/modal/Modal";
import { FC } from "react";
import { useForm } from "antd/es/form/Form";
import { LogWorkFormSchema } from "@features/orders/labour-log-work-form/models/log-work-form.model.ts";
import LabourLogWorkForm from "@features/orders/labour-log-work-form/ui/LabourLogWorkForm";
import { DateFormat } from "@shared/constants/date-format.ts";
import useCreateOrderLabour from "@entities/order/hooks/useCreateOrderLabour.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { CreateOrderLabourDto } from "@entities/order/dto/create-order-labour.dto.ts";
import { getTotalSecondsFromMinutesAndSeconds } from "@shared/utils/time-converter.ts";

interface Props {
  open?: boolean;
  onClose?: () => void;
  orderId: number;
}

const CreateLogWorkModal: FC<Props> = ({ open, onClose, orderId }) => {
  const [form] = useForm<LogWorkFormSchema>();

  const { mutate, isPending } = useCreateOrderLabour();

  const { messageApi } = useMessage();

  const handleCancel = () => {
    onClose?.();
    form.resetFields();
  };

  const handleFinish = (values: LogWorkFormSchema) => {
    const createOrderLabourDto = {
      ...values,
      spentSeconds: getTotalSecondsFromMinutesAndSeconds(values.spentMinutes, values.spentSeconds),
      orderId,
      date: values.date.format(DateFormat.YearMonthDay),
    } satisfies CreateOrderLabourDto;
    mutate(createOrderLabourDto, {
      onSuccess: () => {
        void messageApi.success(`Log work created successfully`);
      },
      onError: () => {
        void messageApi.error("Something went wrong");
      },
      onSettled: () => {
        handleCancel();
      },
    });
  };

  return (
    <Modal
      width={412}
      open={open}
      centered
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Log work
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={isPending}
      cancelButtonProps={{
        disabled: isPending,
        id: "close-log-work-modal",
      }}
      onCancel={handleCancel}
      okText="Log work"
      okButtonProps={{
        id: "create-log-work",
      }}>
      <LabourLogWorkForm form={form} onFinish={handleFinish} />
    </Modal>
  );
};

export default CreateLogWorkModal;
