import Modal from "antd/es/modal/Modal";
import { FC, useEffect } from "react";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { Client } from "@entities/client/model/client.model";
import ClientForm from "@features/clients/client-form/ui/ClientForm";
import { useForm } from "antd/es/form/Form";
import { ClientDto } from "@entities/client/dto/client.dto";
import useUpdateClient from "@entities/client/hooks/useUpdateClient";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  open: boolean;
  client?: Client;
  setIsModalOpen: (value: boolean) => void;
}

const EditClientModal: FC<Props> = ({ open, client, setIsModalOpen }) => {
  const [form] = useForm();

  const updateClientMutation = useUpdateClient();

  const { messageApi } = useMessage();

  useEffect(() => {
    if (client) {
      form.setFieldsValue({
        name: client.name,
        email: client.email,
        address: client.address,
        city: client.city,
        postalCode: client.postalCode,
        vatNumber: client.vatNumber,
        countryId: client.country?.id,
        currencyId: client.currency?.id,
      });
    }
  }, [client, form]);

  const handleFinish = (values: ClientDto) => {
    if (client) {
      updateClientMutation.mutate(
        { id: client?.id, dto: values },
        {
          onSuccess: ({ name }) => {
            messageApi.success(`${name} was updated successfully`);
          },
          onError: () => {
            messageApi.error("Failed to update client");
          },
          onSettled: () => {
            setIsModalOpen(false);
          },
        },
      );
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      confirmLoading={updateClientMutation.isPending}
      cancelButtonProps={{
        disabled: updateClientMutation.isPending,
      }}
      onOk={form.submit}
      onCancel={onClose}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Update Client
        </Typography.Title>
      }
      okText={"Update"}
      centered
      width={680}>
      <ClientForm onFinish={handleFinish} form={form} />
    </Modal>
  );
};

export default EditClientModal;
