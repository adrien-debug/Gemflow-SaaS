import SettingTypeSelect from "@entities/setting-type/ui/SettingTypeSelect";
import FormItem from "antd/es/form/FormItem";

const SettingTypeSelectItem = () => {
  return (
    <FormItem label="Setting type" name="settingType">
      <SettingTypeSelect />
    </FormItem>
  );
};

export default SettingTypeSelectItem;
