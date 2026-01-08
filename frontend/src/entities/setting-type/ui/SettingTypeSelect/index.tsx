import { generateSettingTypes } from "@entities/setting-type/utils/generate-setting-types.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const SettingTypeSelect: FC<Props> = ({ ...rest }) => {
  const data = generateSettingTypes();

  if (!data) return <Select size="large" placeholder="Choose setting type" loading disabled />;

  return (
    <Select
      {...rest}
      placeholder="Choose setting type"
      size="large"
      fieldNames={{ value: "id", label: "name" }}
      options={data}
    />
  );
};

export default SettingTypeSelect;
