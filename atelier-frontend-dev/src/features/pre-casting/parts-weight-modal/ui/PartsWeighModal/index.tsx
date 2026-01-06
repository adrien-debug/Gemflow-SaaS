import { Task } from "@entities/task/models/task.model.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import InfoBadge from "@shared/ui/InfoBadge";
import Tag from "@shared/ui/tag/components/Tag";
import { FormRule } from "@shared/utils/form-validators.ts";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/es/form/Form";
import InputNumber from "antd/es/input-number";
import Modal, { ModalProps } from "antd/es/modal";
import Typography from "antd/es/typography";
import { FC } from "react";
import "./styles.scss";
import { PartsWeightSchema } from "@features/pre-casting/parts-weight-modal/models/parts-weight.schema.ts";

interface Props extends Omit<ModalProps, "onOk"> {
  task: Task;
  onSubmit: (cylinderId: number) => void;
}

const PartsWeightModal: FC<Props> = ({ onSubmit, task, ...rest }) => {
  const [form] = useForm<PartsWeightSchema>();

  const handleSubmit = ({ weight }: PartsWeightSchema) => {
    onSubmit(weight);
  };

  return (
    <Modal
      className="parts-weight-modal"
      {...rest}
      onOk={form.submit}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Parts weight
        </Typography.Title>
      }>
      <Typography.Text>
        Specify the weight of {<Tag tag={{ id: 1, name: task?.stlCount.toString() }} />} parts casted in{" "}
        {<Tag tag={{ id: 1, name: task?.metals[0]?.name }} />} for the following order:
      </Typography.Text>
      <Flex className="parts-weight-order-info" align="center" justify="space-between">
        <Typography.Text className="parts-weight-order-name">{task.order.name}</Typography.Text>
        {!!task?.order?.id && <InfoBadge title={task?.order?.id} />}
      </Flex>
      <Form<PartsWeightSchema> requiredMark={false} layout="vertical" onFinish={handleSubmit} form={form}>
        <FormItem name="weight" label="Weight, g" rules={[FormRule.Required("Specify weight"), FormRule.PartsWeight()]}>
          <InputNumber size="large" placeholder="Enter total weight" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default PartsWeightModal;
