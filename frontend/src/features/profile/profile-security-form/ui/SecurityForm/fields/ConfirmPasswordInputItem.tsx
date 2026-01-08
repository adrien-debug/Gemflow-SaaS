import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import Input from "antd/es/input";

export const ConfirmPasswordInputItem = () => {
  return (
    <Form.Item
      label="Confirm password"
      name="confirmPassword"
      rules={[
        FormRule.Required("Please, confirm your password"),
        FormRule.MatchValue("newPassword", "Password don't match"),
      ]}>
      <Input.Password id="repeat-password" placeholder="Repeat new password" maxLength={256} size="large" />
    </Form.Item>
  );
};
