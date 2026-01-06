import useJewelCategories from "@entities/jewel-category/hooks/useJewelCategories.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const JewelCategorySelect: FC<Props> = ({ ...rest }) => {
  const { data, isPending } = useJewelCategories();

  if (!data) return <Select size="large" placeholder={isPending ? "Loading..." : "Choose category"} loading disabled />;

  return (
    <Select
      {...rest}
      placeholder="Choose category"
      size="large"
      fieldNames={{ value: "id", label: "name" }}
      options={data}
    />
  );
};

export default JewelCategorySelect;
