import ClientSelect from "@entities/client/ui/ClientSelect";
import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";

export const ClientSelectItem = () => {
  return (
    <FormItem label="Client" name="clientId" rules={[FormRule.Required("Choose client")]}>
      <ClientSelect />
    </FormItem>
  );
};
