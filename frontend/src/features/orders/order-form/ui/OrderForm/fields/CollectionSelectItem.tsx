import CollectionSelect from "@entities/collection/ui/CollectionSelect";
import FormItem from "antd/es/form/FormItem";

export const CollectionSelectItem = () => {
  return (
    <FormItem label="Collection" name="collectionId">
      <CollectionSelect />
    </FormItem>
  );
};
