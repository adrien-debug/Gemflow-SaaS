import { useQuery } from "@tanstack/react-query";
import { GEMSTONE_USAGE_STATISTICS_QUERY_KEY } from "@entities/gemstone/constants/query-keys.ts";
import { SearchGemstoneDto } from "@entities/gemstone/dto/search-gemstone.dto.ts";
import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";

const useGemstoneUsageStatistics = (criteria: SearchGemstoneDto["searchCriteria"]) => {
  return useQuery({
    queryKey: [GEMSTONE_USAGE_STATISTICS_QUERY_KEY],
    queryFn: () => GemstoneApi.getOrderUsageStatistics(criteria),
  });
};

export default useGemstoneUsageStatistics;
