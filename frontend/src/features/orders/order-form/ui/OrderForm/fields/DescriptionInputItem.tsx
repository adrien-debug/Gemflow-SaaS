import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";

export const DescriptionInputItem = () => {
  return (
    <FormItem style={{ flex: 1 }} label="Description" name="description">
      <TextArea maxLength={1000} placeholder="Description" size={"large"} />
    </FormItem>
  );
};
