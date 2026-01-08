import DatePicker from "antd/es/date-picker";
import FormItem from "antd/es/form/FormItem";

export const AcceptanceDatePickerItem = () => {
  return (
    <FormItem label="Acceptance date" name="acceptanceDate">
      <DatePicker placeholder="Choose date" size="large" />
    </FormItem>
  );
};
