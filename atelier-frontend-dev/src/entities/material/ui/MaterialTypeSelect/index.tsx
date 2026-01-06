import { generateMaterialTypes } from "@entities/material/utils/generate-material-types.ts";
import Select from "antd/es/select";

const MaterialTypeSelect = ({ ...rest }) => {
  const materials = generateMaterialTypes();

  return (
    <Select
      {...rest}
      size="large"
      placeholder="Choose material"
      options={materials}
      fieldNames={{ value: "id", label: "name" }}
    />
  );
};

export default MaterialTypeSelect;
