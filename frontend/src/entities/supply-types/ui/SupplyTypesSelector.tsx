import Select from "antd/es/select";
import useSupplyTypes from "@entities/supply-types/hooks/useSupplyTypes";

const SupplyTypesSelector = ({ ...rest }) => {
  const types = useSupplyTypes();

  return (
    <Select
      {...rest}
      size="large"
      placeholder="Choose type"
      options={types?.data}
      fieldNames={{ value: "id", label: "name" }}
    />
  );
};

export default SupplyTypesSelector;
