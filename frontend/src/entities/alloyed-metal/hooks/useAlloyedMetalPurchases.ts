import { AlloyedMetalPurchasesApi } from "@entities/alloyed-metal/api/alloyed-metal-purchases.api.ts";
import { ALLOYED_METAL_PURCHASES_QUERY_KEY } from "@entities/alloyed-metal/constants/query-keys.ts";
import { SearchAlloyedMetalPurchasesDto } from "@entities/alloyed-metal/dto/search-alloyed-metal-purchases.dto.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";

const useAlloyedMetalPurchases = (searchParams: SearchAlloyedMetalPurchasesDto) => {
  return usePageableRequest({
    fetcher: AlloyedMetalPurchasesApi.search,
    key: ALLOYED_METAL_PURCHASES_QUERY_KEY,
    requestBody: searchParams,
  });
};

export default useAlloyedMetalPurchases;
