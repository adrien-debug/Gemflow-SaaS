import JewelCategorySelect from "@entities/jewel-category/ui/JewelCategorySelect";
import { FormRule } from "@shared/utils/form-validators.ts";
import FormItem from "antd/es/form/FormItem";

export const CategorySelectItem = () => {
  return (
    <FormItem label="Category" name="itemCategoryId" rules={[FormRule.Required("Choose category")]}>
      <JewelCategorySelect />
    </FormItem>
  );
};
