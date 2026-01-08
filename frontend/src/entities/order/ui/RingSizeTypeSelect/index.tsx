import { generateRingSizeTypes } from "@entities/order/utils/generate-ring-size-types.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const RingSizeTypeSelect: FC<Props> = ({ ...rest }) => {
  const data = generateRingSizeTypes();

  if (!data) return <Select size="large" placeholder="Choose size system" loading disabled />;

  return (
    <Select
      placeholder="Choose size system"
      size="large"
      fieldNames={{ value: "id", label: "name" }}
      options={data}
      {...rest}
    />
  );
};

export default RingSizeTypeSelect;
