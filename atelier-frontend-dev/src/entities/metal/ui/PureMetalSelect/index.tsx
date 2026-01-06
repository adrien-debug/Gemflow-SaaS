import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";
import usePureMetals from "@entities/metal/hooks/usePureMetals.ts";

interface Props extends SelectProps {}

const PureMetalSelect: FC<Props> = ({ ...rest }) => {
  const { data: options, isPending } = usePureMetals();

  if (!options)
    return (
      <Select size="large" placeholder={isPending ? "Loading..." : "Choose metal type"} loading disabled value={null} />
    );

  return (
    <Select placeholder="Choose metal type" size="large" {...rest}>
      {options.map(({ id, name }) => (
        <Select.Option key={id} value={id}>
          {id} · {name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default PureMetalSelect;
