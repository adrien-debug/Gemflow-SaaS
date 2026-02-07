import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CountryApi from "@entities/country/api/country.api";
import { COUNTRIES_QUERY_KEY } from "@entities/country/hooks/constants";

const useCountries = () => {
  return useQuery({
    queryKey: [COUNTRIES_QUERY_KEY],
    queryFn: CountryApi.getCountries,
    placeholderData: keepPreviousData,
    staleTime: 120000,
  });
};

export default useCountries;
