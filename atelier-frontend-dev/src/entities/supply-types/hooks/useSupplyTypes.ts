import { SUPPLY_TYPES_QUERY_KEY } from "@entities/supply-types/hooks/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SupplyTypesApi from "@entities/supply-types/api/supply-types.api";

const useSupplyTypes = () => {
  return useQuery({
    queryFn: () => SupplyTypesApi.getSupplyTypes(),
    queryKey: [SUPPLY_TYPES_QUERY_KEY],
    placeholderData: keepPreviousData,
  });
};

export default useSupplyTypes;
