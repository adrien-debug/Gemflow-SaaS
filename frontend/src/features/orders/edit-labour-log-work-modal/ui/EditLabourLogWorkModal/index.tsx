import { useForm } from "antd/es/form/Form";
import { LogWorkFormSchema } from "@features/orders/labour-log-work-form/models/log-work-form.model.ts";
import useUpdateOrderLabour from "@entities/order/hooks/useUpdateOrderLabour.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import LabourLogWorkForm from "@features/orders/labour-log-work-form/ui/LabourLogWorkForm";
import { FC } from "react";
import { LabourListItem } from "@entities/order/models/labour-list-item.model.ts";
import { UpdateOrderLabourDto } from "@entities/order/dto/update-order-labour.dto.ts";
import { getTotalSecondsFromMinutesAndSeconds } from "@shared/utils/time-converter.ts";

interface Props {
  open?: boolean;
  onClose?: () => void;
  labour?: LabourListItem;
}

const EditLabourLogWorkModal: FC<Props> = ({ labour, open, onClose }) => {
  const [form] = useForm<LogWorkFormSchema>();

  const { mutate, isPending } = useUpdateOrderLabour(labour?.id as number);

  const { messageApi } = useMessage();

  const handleFinish = (values: LogWorkFormSchema) => {
    const updateOrderLabourDto = {
      ...values,
      spentSeconds: getTotalSecondsFromMinutesAndSeconds(values.spentMinutes, values.spentSeconds),
      date: values.date.format(DateFormat.YearMonthDay),
    } satisfies UpdateOrderLabourDto;
    mutate(updateOrderLabourDto, {
      onSuccess: () => {
        void messageApi.success(`Log work updated successfully`);
      },
      onError: () => {
        void messageApi.error("Something went wrong");
      },
      onSettled: () => {
        onClose?.();
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
          Edit logged work
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={isPending}
      cancelButtonProps={{
        disabled: isPending,
        id: "close-edit-log-work-modal",
      }}
      onCancel={() => onClose?.()}
      okText="Log work"
      okButtonProps={{
        id: "edit-log-work",
      }}>
      <LabourLogWorkForm form={form} onFinish={handleFinish} labour={labour} />
    </Modal>
  );
};

export default EditLabourLogWorkModal;
