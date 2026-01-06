import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";
import InputNumber from "antd/es/input-number";

const LengthInputItem = () => {
  return (
    <FormItem label="Lenght" name="length" rules={[FormRule.Required("Enter length")]}>
      <InputNumber maxLength={9} size="large" placeholder="Enter length" />
    </FormItem>
  );
};

export default LengthInputItem;
