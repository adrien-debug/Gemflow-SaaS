import { generateOrderStatuses } from "@entities/order/utils/generate-order-statuses.ts";
import Select, { SelectProps } from "antd/es/select";
import "./styles.scss";
import { FC } from "react";

interface Props extends SelectProps {}

const OrderStatusSelect: FC<Props> = ({ ...rest }) => {
  const data = generateOrderStatuses();

  return (
    <Select
      popupMatchSelectWidth={false}
      className="order-status-select"
      size="large"
      placeholder={"Choose status"}
      fieldNames={{ value: "id", label: "name" }}
      options={data}
      {...rest}
    />
  );
};

export default OrderStatusSelect;
