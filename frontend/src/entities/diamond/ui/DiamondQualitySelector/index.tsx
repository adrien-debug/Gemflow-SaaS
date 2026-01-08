import Select from "antd/es/select";
import { getDiamondQualityOptions } from "@entities/diamond/utils/diamond-quality-options-generator.util.ts";
import { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const DiamondQualitySelector: FC<Props> = ({ ...rest }) => {
  return <Select options={getDiamondQualityOptions()} size="large" placeholder="Choose quality" {...rest} />;
};

export default DiamondQualitySelector;
