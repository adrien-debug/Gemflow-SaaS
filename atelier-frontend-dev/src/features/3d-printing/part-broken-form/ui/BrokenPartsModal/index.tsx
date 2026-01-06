import { Task } from "@entities/task/models/task.model.ts";
import { StlCountSchema } from "@features/3d-printing/part-broken-form/models/stl-count.schema.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import Form from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import InputNumber from "antd/es/input-number";
import { FC } from "react";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Modal, { ModalProps } from "antd/es/modal";

interface Props extends Omit<ModalProps, "onOk"> {
  task: Task;
  onSubmit: (stlCount?: number) => void | Promise<void>;
}

const BrokenPartsModal: FC<Props> = ({ task, onSubmit, ...rest }) => {
  const [form] = useForm();

  const handleFinish = ({ stlCount }: StlCountSchema) => {
    onSubmit(stlCount);
  };

  return (
    <Modal
      centered
      destroyOnClose
      width={412}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          How many parts are broken?
        </Typography.Title>
      }
      okText="Confirm"
      {...rest}
      onOk={form.submit}>
      <Form form={form} onFinish={handleFinish} layout="vertical" requiredMark={false}>
        <FormItem
          name="stlCount"
          label="Number of broken parts"
          rules={[FormRule.Required("Enter number of broken parts")]}>
          <InputNumber
            max={task.stlCount}
            min={1}
            placeholder="Specify quantity"
            style={{ width: "100%" }}
            size="large"
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default BrokenPartsModal;
