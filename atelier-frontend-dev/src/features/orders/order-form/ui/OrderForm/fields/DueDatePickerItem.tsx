import DatePicker from "antd/es/date-picker";
import FormItem from "antd/es/form/FormItem";

export const DueDatePickerItem = () => {
  return (
    <FormItem label="Due date" name="dueDate">
      <DatePicker placeholder={"Choose date"} size="large" />
    </FormItem>
  );
};
