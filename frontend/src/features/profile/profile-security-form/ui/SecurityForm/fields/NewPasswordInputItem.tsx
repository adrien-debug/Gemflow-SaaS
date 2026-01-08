import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import Input from "antd/es/input";

export const NewPasswordInputItem = () => {
  return (
    <Form.Item
      label="New password"
      name="newPassword"
      rules={[FormRule.MinLength(8, "Use 8 characters or more"), FormRule.Required("Please, enter new password")]}>
      <Input.Password id="new-password" placeholder="Enter new password" maxLength={256} size="large" />
    </Form.Item>
  );
};
