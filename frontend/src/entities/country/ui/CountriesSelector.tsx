import useCountries from "@entities/country/hooks/useCountries";
import Select from "antd/es/select";

const CountriesSelector = ({ ...rest }) => {
  const { data: countries } = useCountries();

  return (
    <Select
      {...rest}
      size="large"
      placeholder="Choose country"
      options={countries}
      fieldNames={{ value: "id", label: "name" }}
    />
  );
};

export default CountriesSelector;
