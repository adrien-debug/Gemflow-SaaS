import useCurrencies from "@entities/currency/hooks/useCurrencies";
import Select from "antd/es/select";

const CurrenciesSelector = ({ ...rest }) => {
  const { data: currencies } = useCurrencies();

  return (
    <Select
      {...rest}
      size="large"
      placeholder="Choose currency"
      options={currencies}
      fieldNames={{ value: "id", label: "code" }}
    />
  );
};

export default CurrenciesSelector;
