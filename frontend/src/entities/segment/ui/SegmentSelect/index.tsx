import useSegments from "@entities/segment/hooks/useSegments.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const SegmentSelect: FC<Props> = ({ ...rest }) => {
  const { data, isPending } = useSegments();

  if (!data) return <Select size="large" placeholder={isPending ? "Loading..." : "Choose segment"} loading disabled />;

  return (
    <Select
      {...rest}
      placeholder="Choose segment"
      size="large"
      fieldNames={{ value: "id", label: "name" }}
      options={data}
    />
  );
};

export default SegmentSelect;
