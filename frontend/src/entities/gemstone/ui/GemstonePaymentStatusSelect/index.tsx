import useGemstonePaymentStatuses from "@entities/gemstone/hooks/useGemstonePaymentStatuses.ts";
import Select, { SelectProps } from "antd/es/select";
import { FC } from "react";
import "./styles.scss";
import DataDisplay from "@shared/ui/DataDisplay";

interface Props extends SelectProps {}

const GemstonePaymentStatusSelect: FC<Props> = (rest) => {
  const { data } = useGemstonePaymentStatuses();

  if (!data) return <Select size="large" placeholder="Choose payment status" loading disabled />;

  return (
    <DataDisplay label="Payment Status" variant="common">
      <Select
        popupMatchSelectWidth={false}
        className="gemstone-payment-status-select"
        size="large"
        placeholder={"Choose payment status"}
        fieldNames={{ value: "id", label: "name" }}
        options={data}
        {...rest}
      />
    </DataDisplay>
  );
};

export default GemstonePaymentStatusSelect;
