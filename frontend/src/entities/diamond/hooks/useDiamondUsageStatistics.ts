import { useQuery } from "@tanstack/react-query";
import DiamondUsageApi from "@entities/diamond/api/diamond-usage.api.ts";
import { SearchDiamondUsageDto } from "@entities/diamond/dto/search-diamond-usage.dto.ts";
import { DIAMOND_USAGE_STATISTICS_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";

const useDiamondUsageStatistics = (dto: SearchDiamondUsageDto["searchCriteria"]) => {
  return useQuery({
    queryFn: () => DiamondUsageApi.getStatistics(dto),
    queryKey: [DIAMOND_USAGE_STATISTICS_QUERY_KEY],
  });
};

export default useDiamondUsageStatistics;
