import { FC } from "react";
import Modal from "antd/es/modal/Modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import useCompleteCad from "@entities/task/hooks/useCompleteCad.ts";
import { useForm } from "antd/es/form/Form";
import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import DatePicker from "antd/es/date-picker";
import { CadAcceptanceFormSchema } from "@features/cad/cad-acceptance-date-modal/models/cad-acceptance-form.model.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import { Task } from "@entities/task/models/task.model.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  open: boolean;
  task: Task;
  onClose?: () => void;
}

const CadAcceptanceDateModal: FC<Props> = ({ task, open, onClose }) => {
  const [form] = useForm<CadAcceptanceFormSchema>();
  const { messageApi } = useMessage();
  const mutation = useCompleteCad();

  const handleCancel = () => {
    form.resetFields();
    onClose?.();
  };

  const handleFinish = (values: CadAcceptanceFormSchema) => {
    mutation.mutate(
      {
        taskId: task.id,
        dto: { acceptanceDate: values?.acceptanceDate?.format(DateFormat.YearMonthDay) },
      },
      {
        onSuccess: () => {
          void messageApi.success("The task is moved to the ‘3d Printing’ stage");
        },
        onError: () => {
          void messageApi.error("Failed to complete the task");
        },
        onSettled: () => {
          handleCancel();
        },
      },
    );
  };

  return (
    <Modal
      centered
      open={open}
      width={400}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          CAD complete
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
      }}
      onCancel={handleCancel}
      okText="Confirm">
      <Form form={form} onFinish={handleFinish} requiredMark={false} layout="vertical">
        <Form.Item<CadAcceptanceFormSchema>
          name="acceptanceDate"
          label="Acceptance date"
          rules={[FormRule.Required("Please, select date")]}>
          <DatePicker size="large" style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CadAcceptanceDateModal;
