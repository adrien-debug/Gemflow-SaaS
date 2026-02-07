import { useState } from "react";
import Form from "antd/es/form";
import Flex from "antd/es/flex";
import EditFormController from "@shared/ui/EditFormController";
import SecurityForm from "@features/profile/profile-security-form/ui/SecurityForm";
import useChangePassword from "@entities/user/hooks/useChangePassword.ts";
import { CredentialsFormModel } from "@entities/user/models/password.models.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

const SecurityPage = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { messageApi } = useMessage();

  const { changePasswordMutation } = useChangePassword();

  const handleSubmit = async ({ newPassword, currentPassword }: CredentialsFormModel) => {
    changePasswordMutation.mutate(
      { newPassword, currentPassword },
      {
        onSuccess: () => {
          messageApi.success("Password successfully saved");
        },
        onError: () => {
          messageApi.error("Failed to save new password");
        },
        onSettled: () => onCancel(),
      },
    );
  };

  const onCancel = () => {
    form.resetFields();
    setEditing(false);
  };

  return (
    <Flex vertical className="security-widget">
      <EditFormController
        title="Security"
        editing={editing}
        description="Change your current password"
        onCancel={onCancel}
        onSave={form.submit}
        onEdit={() => setEditing(true)}
        loading={changePasswordMutation.isPending}
        editButtonProps={{
          children: "Change password",
          type: "primary",
          icon: null,
        }}
        id="security"
      />
      <SecurityForm form={form} editing={editing} onSubmit={handleSubmit} />
    </Flex>
  );
};

export default SecurityPage;
