import { FC, ReactNode, useEffect } from "react";
import Modal, { ModalProps } from "antd/es/modal";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Form from "antd/es/form";
import InputNumber from "antd/es/input-number";
import { useForm } from "antd/es/form/Form";
import { MetalWeightFormFields } from "@features/metals/edit-metal-weight/models/metal-weight-form.model.ts";
import Flex from "antd/es/flex";
import { FormRule } from "@shared/utils/form-validators.ts";

interface Props extends ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  topRightContent?: ReactNode;
  onSave?: (metalWeight: number) => void;
  description?: string;
  initialValue?: number;
}

const EditMetalWeightModal: FC<Props> = ({
  open,
  onClose,
  title,
  topRightContent,
  onSave,
  initialValue,
  description,
  ...rest
}) => {
  const [form] = useForm<MetalWeightFormFields>();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ metalWeight: initialValue });
    }
  }, [open, initialValue, form]);

  const onFinish = (values: MetalWeightFormFields) => {
    onSave?.(values.metalWeight);
  };

  return (
    <Modal
      {...rest}
      open={open}
      width={412}
      centered
      title={
        <Flex align="center" gap={16} style={{ marginBottom: 24 }}>
          <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 0, color: brandingColorPalette.brand6 }}>
            {title ?? "Edit weight"}
          </Typography.Title>
          {topRightContent}
        </Flex>
      }
      onCancel={() => onClose?.()}
      onOk={() => form.submit()}
      okText="Save"
      destroyOnClose>
      <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}>
        <Form.Item
          label={description}
          name="metalWeight"
          initialValue={initialValue}
          rules={[FormRule.Required("Please, enter weight"), FormRule.BasicWeight()]}>
          <InputNumber min={0} size="large" style={{ width: "100%" }} placeholder="Enter weight" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditMetalWeightModal;
