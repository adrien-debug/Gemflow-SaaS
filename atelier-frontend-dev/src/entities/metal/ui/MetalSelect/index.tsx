import useMetals from "@entities/metal/hooks/useMetals.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const MetalSelect: FC<Props> = ({ ...rest }) => {
  const { data: options, isPending } = useMetals();

  if (!options)
    return <Select size="large" placeholder={isPending ? "Loading..." : "Choose metal type"} loading disabled />;

  return (
    <Select placeholder="Choose metal type" size="large" {...rest} optionLabelProp="children">
      {options.map((metal) => (
        <Select.Option key={metal.id} value={metal.id} data={metal}>
          {metal.id} · {metal.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MetalSelect;
