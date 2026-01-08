import Modal from "antd/es/modal/Modal";
import { FC } from "react";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { useForm } from "antd/es/form/Form";
import useCreateUser from "@entities/user/hooks/useCreateUser";
import { CreateUserDto } from "@entities/user/dto/create-user.dto";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import UserForm from "@features/users/user-form/ui/UserForm";

interface Props {
  open: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const CreateUserModal: FC<Props> = ({ open, setIsModalOpen }) => {
  const [form] = useForm();

  const { messageApi } = useMessage();

  const createUserMutation = useCreateUser();

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const handleFinish = (values: CreateUserDto) => {
    createUserMutation.mutate(values, {
      onSuccess: ({ fullName }) => {
        messageApi.success(`${fullName} was created successfully`);
      },
      onError: () => {
        messageApi.error("Failed to create new user");
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
      okButtonProps={{
        id: "create-user",
      }}
      confirmLoading={createUserMutation.isPending}
      cancelButtonProps={{
        disabled: createUserMutation.isPending,
        id: "cancel-create-user",
      }}
      closeIcon={<CloseOutlined id="administration-page-close" />}
      onOk={form.submit}
      onCancel={onClose}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Add new user
        </Typography.Title>
      }
      okText={"Create"}
      centered
      width={412}>
      <UserForm onFinish={handleFinish} form={form} />
    </Modal>
  );
};

export default CreateUserModal;
