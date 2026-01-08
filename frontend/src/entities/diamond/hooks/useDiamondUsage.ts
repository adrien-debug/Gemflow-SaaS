import { SearchDiamondUsageDto } from "@entities/diamond/dto/search-diamond-usage.dto.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import DiamondUsageApi from "@entities/diamond/api/diamond-usage.api.ts";
import { DIAMOND_USAGE_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";

const useDiamondUsage = (searchConfig: SearchDiamondUsageDto) => {
  return usePageableRequest({
    fetcher: DiamondUsageApi.search,
    key: DIAMOND_USAGE_QUERY_KEY,
    requestBody: searchConfig,
  });
};

export default useDiamondUsage;
