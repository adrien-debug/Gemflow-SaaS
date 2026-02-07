import useMetalPurities from "@entities/metal-purity/hooks/useMetalPurities.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {
  metalId: number;
}

const MetalPuritySelect: FC<Props> = ({ metalId, ...rest }) => {
  const { data, isFetching } = useMetalPurities({ metalId });

  if (!data)
    return <Select size="large" placeholder={isFetching ? "Loading..." : "Choose metal purity"} loading disabled />;

  return (
    <Select
      {...rest}
      placeholder="Choose category"
      size="large"
      fieldNames={{ value: "id", label: "metalPurity" }}
      options={data}
    />
  );
};

export default MetalPuritySelect;
