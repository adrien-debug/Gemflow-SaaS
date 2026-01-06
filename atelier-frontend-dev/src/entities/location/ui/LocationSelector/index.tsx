import useLocations from "@entities/location/hooks/useLocation";
import Select from "antd/es/select";

const LocationSelector = ({ ...rest }) => {
  const { data: locations } = useLocations();

  if (!locations) return <Select size="large" placeholder={rest.placeholder || "Choose location"} loading disabled />;

  return (
    <Select
      {...rest}
      size="large"
      placeholder="Choose location"
      options={locations}
      fieldNames={{ value: "id", label: "name" }}
    />
  );
};

export default LocationSelector;
