import { generateGemstoneStatuses } from "@entities/gemstone/utils/generate-gemstone-statuses.ts";
import Select, { SelectProps } from "antd/es/select";
import "./styles.scss";
import { FC } from "react";
import DataDisplay from "@shared/ui/DataDisplay";

interface Props extends SelectProps {}

const GemstoneStatusSelect: FC<Props> = ({ ...rest }) => {
  const data = generateGemstoneStatuses();

  return (
    <DataDisplay label="Status" variant="common">
      <Select
        popupMatchSelectWidth={false}
        className="gemstone-status-select"
        size="large"
        placeholder={"Choose status"}
        fieldNames={{ value: "id", label: "name" }}
        options={data}
        {...rest}
      />
    </DataDisplay>
  );
};

export default GemstoneStatusSelect;
