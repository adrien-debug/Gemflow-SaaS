import useHallmarkLogos from "@entities/hallmark-logo/hooks/useHallmarkLogos.tsx";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const HallmarkLogoSelect: FC<Props> = ({ ...rest }) => {
  const { data: options, isPending } = useHallmarkLogos();

  if (!options)
    return <Select size="large" placeholder={isPending ? "Loading..." : "Choose halmark logo"} loading disabled />;

  return (
    <Select {...rest} placeholder="Choose halmark logo" size="large">
      {options.map((logo) => (
        <Select.Option key={logo.id} value={logo.id} data={logo}>
          {logo.id} · {logo.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default HallmarkLogoSelect;
