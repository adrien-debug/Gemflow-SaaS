import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import Input from "antd/es/input";

export const EmailInputItem = () => {
  return (
    <Form.Item name="email" rules={[FormRule.Required("Please, enter email")]} label="Email">
      <Input id="profile-page-email" size="large" className="first-name-input" disabled={true} />
    </Form.Item>
  );
};
