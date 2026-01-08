import Modal from "antd/es/modal/Modal";
import { FC } from "react";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import ClientForm from "@features/clients/client-form/ui/ClientForm";
import { ClientDto } from "@entities/client/dto/client.dto";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useCreateClient from "@entities/client/hooks/useCreateClient";
import { useForm } from "antd/es/form/Form";

interface Props {
  open: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const CreateClientModal: FC<Props> = ({ open, setIsModalOpen }) => {
  const [form] = useForm();

  const { messageApi } = useMessage();

  const createClientMutation = useCreateClient();

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = (values: ClientDto) => {
    createClientMutation.mutate(values, {
      onSuccess: ({ name }) => {
        messageApi.success(`${name} was created successfully`);
      },
      onError: () => {
        messageApi.error("Failed to create new client");
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
      confirmLoading={createClientMutation.isPending}
      cancelButtonProps={{
        disabled: createClientMutation.isPending,
      }}
      onOk={form.submit}
      onCancel={onClose}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Create Client
        </Typography.Title>
      }
      okText={"Create"}
      centered
      width={680}>
      <ClientForm onFinish={handleFinish} form={form} />
    </Modal>
  );
};

export default CreateClientModal;
