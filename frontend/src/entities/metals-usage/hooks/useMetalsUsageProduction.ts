import { useQuery } from "@tanstack/react-query";
import MetalsUsageApi from "@entities/metals-usage/api/metals-usage.api.ts";
import { METAL_USAGE_PRODUCTION_QUERY_KEY } from "@entities/metals-usage/constants/query-keys.ts";

export const useMetalsUsageProduction = (id: number) =>
  useQuery({
    queryKey: [METAL_USAGE_PRODUCTION_QUERY_KEY, id],
    queryFn: () => MetalsUsageApi.getMetalProductions(id),
    staleTime: 60000,
  });

export default useMetalsUsageProduction;
