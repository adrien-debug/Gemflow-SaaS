import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input";

export const OrderNameInputItem = () => {
  return (
    <FormItem label="Order name" name="name" rules={[FormRule.Required("Enter order name")]}>
      <Input maxLength={128} size="large" placeholder="Enter order name" />
    </FormItem>
  );
};
