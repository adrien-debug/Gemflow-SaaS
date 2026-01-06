import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import Input from "antd/es/input";

export const CurrentPasswordInputItem = () => {
  return (
    <Form.Item
      label="Current password"
      name="currentPassword"
      rules={[FormRule.Required("Please, enter current password")]}>
      <Input.Password id="current-password" placeholder="Enter current password" maxLength={256} size="large" />
    </Form.Item>
  );
};
