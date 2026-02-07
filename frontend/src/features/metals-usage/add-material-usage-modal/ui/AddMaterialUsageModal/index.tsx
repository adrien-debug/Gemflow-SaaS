import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Modal from "antd/es/modal/Modal";
import { FC } from "react";
import { useForm, useWatch } from "antd/es/form/Form";
import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";
import InputNumber from "antd/es/input-number";
import UserSelect from "@entities/user/ui/UserSelect";
import useAddMaterialToOrder from "@entities/metals-usage/hooks/useAddMaterialToOrder.ts";
import { AddMaterialUsageDto } from "@entities/metals-usage/dto/add-material-usage.dto.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import AlloyedMetalSelect from "@entities/alloyed-metal/ui/AlloyedMetalSelect";
import { useAlloyedMetal } from "@entities/alloyed-metal/hooks/useAlloyedMetal.ts";

interface Props {
  orderId: number;
  open?: boolean;
  onClose?: () => void;
}

const AddMaterialUsageModal: FC<Props> = ({ orderId, open, onClose }) => {
  const [form] = useForm();
  const { messageApi } = useMessage();
  const alloyedMetalId = useWatch("alloyedMetalId", form);

  const { data: currentAlloyedMetal } = useAlloyedMetal(alloyedMetalId);

  const mutation = useAddMaterialToOrder(orderId);

  const handleCancel = () => {
    onClose?.();
    form.resetFields();
  };

  const handleFinish = (values: AddMaterialUsageDto) => {
    mutation.mutate(values, {
      onSuccess: () => {
        void messageApi.success("Material was added successfully to the order");
      },
      onError: () => {
        void messageApi.error("Failed to add material to the order");
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
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Add material usage
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
        id: "close-add-material-usage-modal",
      }}
      onCancel={handleCancel}
      okText="Add"
      destroyOnClose>
      <Form form={form} requiredMark={false} layout="vertical" onFinish={handleFinish}>
        <FormItem
          name="alloyedMetalId"
          label="Alloyed metal name"
          rules={[FormRule.Required("Please, choose material")]}
          help={currentAlloyedMetal && `The remaining weight is ${currentAlloyedMetal.remainingWeight}g`}>
          <AlloyedMetalSelect style={{ minWidth: 200 }} allowClear placeholder="Choose material" />
        </FormItem>

        <FormItem
          name="weight"
          label="Weight, g"
          rules={[
            FormRule.Required(),
            FormRule.PreciseWeight(),
            FormRule.MaxRemainingWeight(currentAlloyedMetal?.remainingWeight ?? null),
          ]}>
          <InputNumber
            min={0.01}
            size="large"
            placeholder="Enter weight"
            style={{ width: "100%" }}
            disabled={!currentAlloyedMetal?.remainingWeight}
          />
        </FormItem>

        <Form.Item
          validateTrigger="onBlur"
          name="employeeId"
          label="Employee"
          rules={[FormRule.Required("Please, select employee")]}>
          <UserSelect placeholder="Choose employee" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMaterialUsageModal;
