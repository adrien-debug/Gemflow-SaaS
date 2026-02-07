import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import Input from "antd/es/input";

export const LastNameInputItem = () => {
  return (
    <Form.Item name="lastName" rules={[FormRule.Required("Please, enter last name")]} label="Last Name">
      <Input id="profile-page-last-name" size="large" />
    </Form.Item>
  );
};
