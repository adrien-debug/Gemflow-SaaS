import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CurrencyApi from "@entities/currency/api/currency.api";
import { CURRENCIES_QUERY_KEY } from "@entities/currency/hooks/constants";

const useCurrencies = () => {
  return useQuery({
    queryKey: [CURRENCIES_QUERY_KEY],
    queryFn: CurrencyApi.getCurrencies,
    placeholderData: keepPreviousData,
    staleTime: 120000,
  });
};

export default useCurrencies;
