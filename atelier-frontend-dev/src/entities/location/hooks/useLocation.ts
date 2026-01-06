import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { LOCATIONS_QUERY_KEY } from "@entities/location/constants/constants";
import LocationApi from "@entities/location/api/location.api";

const useLocations = () => {
  return useQuery({
    queryKey: [LOCATIONS_QUERY_KEY],
    queryFn: LocationApi.getAll,
    placeholderData: keepPreviousData,
    staleTime: 120000,
  });
};

export default useLocations;
