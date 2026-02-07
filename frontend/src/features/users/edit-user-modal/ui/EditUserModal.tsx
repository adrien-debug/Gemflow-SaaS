import Modal from "antd/es/modal/Modal";
import { FC, useEffect } from "react";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { useForm } from "antd/es/form/Form";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import UserForm from "@features/users/user-form/ui/UserForm";
import useUpdateUser from "@entities/user/hooks/useUpdateUser";
import { UpdateUserDto } from "@entities/user/dto/update-user.dto";
import { User } from "@entities/user/models/user.model";

interface Props {
  open: boolean;
  setIsModalOpen: (value: boolean) => void;
  user?: User;
}

const EditUserModal: FC<Props> = ({ open, setIsModalOpen, user }) => {
  const [form] = useForm();
  const { messageApi } = useMessage();

  const updateUserMutation = useUpdateUser();

  const onCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.role.id,
      });
    }
  }, [user, form]);

  const handleFinish = (values: UpdateUserDto) => {
    if (user) {
      updateUserMutation.mutate(
        { id: user.id, dto: values },
        {
          onSuccess: ({ fullName }) => {
            messageApi.success(`${fullName} was updated successfully`);
          },
          onError: () => {
            messageApi.error("Failed to update user");
          },
          onSettled: () => {
            setIsModalOpen(false);
          },
        },
      );
    }
  };

  const onClose = () => {
    onCancel();
  };

  return (
    <Modal
      okButtonProps={{
        id: "edit-user",
      }}
      confirmLoading={updateUserMutation.isPending}
      cancelButtonProps={{
        disabled: updateUserMutation.isPending,
        id: "cancel-edit-user",
      }}
      closeIcon={<CloseOutlined id="administration-page-close" />}
      onOk={form.submit}
      onCancel={onClose}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Update user
        </Typography.Title>
      }
      okText={"Update"}
      centered
      width={412}>
      <UserForm onFinish={handleFinish} form={form} user={user} />
    </Modal>
  );
};

export default EditUserModal;
