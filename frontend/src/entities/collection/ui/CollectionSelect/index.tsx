import useCollections from "@entities/collection/hooks/useCollections.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const CollectionSelect: FC<Props> = ({ ...rest }) => {
  const { data, isPending } = useCollections();

  if (!data)
    return <Select size="large" placeholder={isPending ? "Loading..." : "Choose collection"} loading disabled />;

  return (
    <Select
      placeholder="Choose collection"
      size="large"
      fieldNames={{ value: "id", label: "name" }}
      options={data}
      {...rest}
    />
  );
};

export default CollectionSelect;
