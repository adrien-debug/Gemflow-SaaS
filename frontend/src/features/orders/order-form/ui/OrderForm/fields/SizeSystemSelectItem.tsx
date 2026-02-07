import { RingSizeType } from "@entities/order/constants/ring-size.enum.ts";
import RingSizeTypeSelect from "@entities/order/ui/RingSizeTypeSelect";
import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";

const SizeSystemSelectItem = () => {
  return (
    <FormItem
      label="Size system"
      name="sizeSystem"
      initialValue={RingSizeType.EUROPEAN}
      rules={[FormRule.Required("Choose size system")]}>
      <RingSizeTypeSelect />
    </FormItem>
  );
};

export default SizeSystemSelectItem;
