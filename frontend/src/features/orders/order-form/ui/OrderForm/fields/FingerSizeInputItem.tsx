import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";
import InputNumber from "antd/es/input-number";

const FingerSizeInputItem = () => {
  return (
    <FormItem label="Finger size" name="fingerSize" rules={[FormRule.Required("Enter finger size")]}>
      <InputNumber maxLength={9} size="large" placeholder="Enter length" />
    </FormItem>
  );
};

export default FingerSizeInputItem;
