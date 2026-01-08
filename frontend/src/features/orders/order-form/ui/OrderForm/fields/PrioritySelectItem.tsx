import OrderPrioritySelect from "@entities/order/ui/OrderPrioritySelect";
import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";

export const PrioritySelectItem = () => {
  return (
    <FormItem name="priority" label="Priority" rules={[FormRule.Required("Choose priority")]}>
      <OrderPrioritySelect />
    </FormItem>
  );
};
