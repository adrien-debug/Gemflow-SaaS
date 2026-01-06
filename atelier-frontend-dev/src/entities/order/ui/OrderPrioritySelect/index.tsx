import { generateOrderPriorities } from "@entities/order/utils/generate-order-priorities.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";

interface Props extends SelectProps {}

const OrderPrioritySelect: FC<Props> = ({ ...rest }) => {
  const data = generateOrderPriorities();

  if (!data) return <Select size="large" placeholder="Choose priority" loading disabled />;

  return (
    <Select
      {...rest}
      placeholder="Choose priority"
      size="large"
      fieldNames={{ value: "id", label: "name" }}
      options={data}
    />
  );
};

export default OrderPrioritySelect;
