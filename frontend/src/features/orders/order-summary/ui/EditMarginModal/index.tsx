import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Form from "antd/es/form";
import FormItem from "antd/es/form/FormItem";
import { FormRule } from "@shared/utils/form-validators.ts";
import Modal from "antd/es/modal/Modal";
import { useForm } from "antd/es/form/Form";
import { FC, useEffect } from "react";
import InputNumber from "antd/es/input-number";

interface Props {
  open: boolean;
  setIsModalOpen: (item: boolean) => void;
  handleFinish: (value: { margin: number }) => void;
  currentMargin: number;
  loading: boolean;
}

const EditMarginModal: FC<Props> = ({ open, handleFinish, currentMargin, setIsModalOpen, loading }) => {
  const [form] = useForm();

  useEffect(() => {
    if (open) {
      form.setFieldValue("margin", currentMargin);
    }
  }, [currentMargin, form, open]);

  const handleClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      width={412}
      open={open}
      confirmLoading={loading}
      cancelButtonProps={{
        disabled: loading,
      }}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Edit margin
        </Typography.Title>
      }
      onOk={form.submit}
      onCancel={handleClose}
      okText="Save"
      destroyOnClose>
      <Form
        form={form}
        requiredMark={false}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ margin: currentMargin }}>
        <FormItem
          name="margin"
          label="Margin"
          rules={[FormRule.Required("Please, enter margin"), FormRule.Max(1000), FormRule.Min(0), FormRule.Integer()]}>
          <InputNumber prefix="%" size="large" style={{ width: "100%" }} placeholder="Enter margin" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditMarginModal;
