import { SelectMetalSchema } from "@features/3d-printing/move-to-casting-form/models/select-metal.schema.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import Form from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import InputNumber from "antd/es/input-number";
import { FC, useEffect } from "react";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Modal, { ModalProps } from "antd/es/modal";
import Radio from "antd/es/radio";
import { Task } from "@entities/task/models/task.model.ts";

interface Props extends Omit<ModalProps, "onOk"> {
  task: Task;
  onSubmit: (values: SelectMetalSchema) => void;
}

const SelectMetalModal: FC<Props> = ({ task, onSubmit, ...rest }) => {
  const [form] = useForm();

  const handleFinish = (values: SelectMetalSchema) => {
    onSubmit(values);
  };

  useEffect(() => {
    if (task) {
      const defaultStlCount = task.metals.length === 1 ? task.stlCount : undefined;

      form.setFieldsValue({
        metalId: task.metals[0].id,
        stlCount: defaultStlCount,
      });
    }
  }, [form, task]);

  return (
    <Modal
      centered
      destroyOnClose
      width={460}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Metal and parts quantity
        </Typography.Title>
      }
      okText="Confirm"
      onOk={form.submit}
      {...rest}>
      <Form<SelectMetalSchema> form={form} requiredMark={false} layout="vertical" onFinish={handleFinish}>
        <FormItem layout="vertical" name="metalId" label="Choose metal" rules={[FormRule.Required("Choose metal")]}>
          <Radio.Group
            block
            options={task.metals.map((metal) => ({ label: metal.name, value: metal.id }))}
            optionType="button"
            buttonStyle="solid"
          />
        </FormItem>

        <FormItem
          layout="vertical"
          name="stlCount"
          label="Number of parts"
          rules={[FormRule.Required("Enter number of parts")]}>
          <InputNumber
            max={task.stlCount}
            disabled={task.metals.length === 1}
            placeholder="Specify quantity"
            style={{ width: "100%" }}
            size="large"
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default SelectMetalModal;
