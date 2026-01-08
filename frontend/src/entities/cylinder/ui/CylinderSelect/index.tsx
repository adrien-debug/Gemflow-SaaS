import useCylinders from "@entities/cylinder/hooks/useCylinders.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const CylinderSelect: FC<Props> = ({ ...rest }) => {
  const { data, isPending } = useCylinders();

  if (!data?.length)
    return <Select size="large" placeholder={isPending ? "Loading..." : "Choose cylinder"} loading disabled />;

  return (
    <Select
      placeholder="Choose cylinder"
      size="large"
      fieldNames={{ value: "id", label: "name" }}
      options={data}
      {...rest}
    />
  );
};

export default CylinderSelect;
