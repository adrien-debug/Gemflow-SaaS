import { FormRule } from "@shared/utils/form-validators.ts";
import Input from "antd/es/input";
import Form from "antd/es/form";

export const FirstNameInputItem = () => {
  return (
    <Form.Item
      name="firstName"
      rules={[
        FormRule.Required("Please, enter first name"),
        FormRule.MinLength(3, "First name be greater than 3 characters"),
        FormRule.MaxLength(64, "First name cannot be greater than 64 characters"),
      ]}
      label="First Name">
      <Input id="profile-page-first-name" size="large" />
    </Form.Item>
  );
};
