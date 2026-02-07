import SelectCylinderRadio from "@entities/cylinder/ui/SelectCylinderRadio";
import MetalTag from "@entities/metal/ui/MetalTag";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import Form from "antd/es/form";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/es/form/Form";
import Modal, { ModalProps } from "antd/es/modal";
import Typography from "antd/es/typography";
import { FC } from "react";
import "./styles.scss";
import { SelectCylinderSchema } from "@features/pre-casting/select-cylinder-modal/models/select-cylinder.schema.ts";
import useStartCasting from "@entities/task/hooks/useStartCasting.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useCylinders from "@entities/cylinder/hooks/useCylinders.ts";

interface Props extends Omit<ModalProps, "onOk"> {
  metal: BaseItem;
  taskId: number;
}

const SelectCylinderModal: FC<Props> = ({ metal, taskId, ...rest }) => {
  const [form] = useForm();

  const { messageApi } = useMessage();
  const mutation = useStartCasting(taskId);
  const { data: cylinders } = useCylinders();

  const handleSubmit = ({ cylinderId }: SelectCylinderSchema) => {
    const selectedCylinderName = cylinders?.find(({ id }) => cylinderId === id)?.name;

    mutation.mutate(
      { cylinderId },
      {
        onSuccess: () => {
          void messageApi.success(`The task is moved to ${selectedCylinderName}`);
        },
        onError: () => {
          void messageApi.error("Failed to move task on Cylinder ");
        },
      },
    );
  };

  return (
    <Modal
      {...rest}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{ disabled: mutation.isPending }}
      afterClose={form.resetFields}
      onOk={form.submit}
      title={
        <div className="select-cylinder-modal-title">
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
            Move to Casting
          </Typography.Title>

          <Typography.Text style={{ fontWeight: 400 }}>
            Task metal: <MetalTag>{metal.name}</MetalTag>
          </Typography.Text>
        </div>
      }>
      <Form requiredMark={false} layout="vertical" onFinish={handleSubmit} form={form}>
        <FormItem name="cylinderId" label="Choose cylinder" rules={[FormRule.Required("Choose cylinder")]}>
          <SelectCylinderRadio availableMetal={metal} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default SelectCylinderModal;
