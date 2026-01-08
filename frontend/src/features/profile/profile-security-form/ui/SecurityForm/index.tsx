import "./styles.scss";
import Form, { FormInstance } from "antd/es/form";
import { FC } from "react";
import { CredentialsFormModel } from "@entities/user/models/password.models.ts";
import { CurrentPasswordInputItem } from "@features/profile/profile-security-form/ui/SecurityForm/fields/CurrentPasswordInputItem.tsx";
import { NewPasswordInputItem } from "@features/profile/profile-security-form/ui/SecurityForm/fields/NewPasswordInputItem.tsx";
import { ConfirmPasswordInputItem } from "@features/profile/profile-security-form/ui/SecurityForm/fields/ConfirmPasswordInputItem.tsx";

interface Props {
  form: FormInstance;
  editing: boolean;
  onSubmit: (values: CredentialsFormModel) => void;
}

const SecurityForm: FC<Props> = ({ form, editing, onSubmit }) => {
  return (
    <Form
      onFinish={onSubmit}
      layout="vertical"
      form={form}
      requiredMark={false}
      disabled={!editing}
      className="security-form">
      <CurrentPasswordInputItem />
      <NewPasswordInputItem />
      <ConfirmPasswordInputItem />
    </Form>
  );
};

export default SecurityForm;
