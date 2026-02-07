import Modal from "antd/es/modal/Modal";
import { FC } from "react";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { useForm } from "antd/es/form/Form";
import useCreateSupplier from "@entities/supplier/hooks/useCreateSupplier";
import { SupplierDto } from "@entities/supplier/dto/supplier.dto";
import SupplierForm from "@features/suppliers/supplier-form/ui/SupplierForm";

interface Props {
  open: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const CreateSupplierModal: FC<Props> = ({ open, setIsModalOpen }) => {
  const [form] = useForm();

  const { messageApi } = useMessage();

  const createSupplierMutation = useCreateSupplier();

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = (values: SupplierDto) => {
    createSupplierMutation.mutate(values, {
      onSuccess: ({ name }) => {
        messageApi.success(`${name} was created successfully`);
      },
      onError: () => {
        messageApi.error("Failed to create new supplier");
      },
      onSettled: () => {
        setIsModalOpen(false);
        form.resetFields();
      },
    });
  };

  const onClose = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      confirmLoading={createSupplierMutation.isPending}
      cancelButtonProps={{
        disabled: createSupplierMutation.isPending,
      }}
      onOk={form.submit}
      onCancel={onClose}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Create Supplier
        </Typography.Title>
      }
      okText={"Create"}
      centered
      width={680}>
      <SupplierForm onFinish={handleFinish} form={form} />
    </Modal>
  );
};

export default CreateSupplierModal;
