import { AlloyPurchasesApi } from "@entities/alloy/api/alloy-purchases.api.ts";
import { ALLOYS_PURCHASES_LIST_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { SearchAlloyPurchasesDto } from "@entities/alloy/dto/search-alloy-purchases.dto.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";

const useAlloyPurchases = (searchParams: SearchAlloyPurchasesDto) => {
  return usePageableRequest({
    fetcher: AlloyPurchasesApi.search,
    key: ALLOYS_PURCHASES_LIST_QUERY_KEY,
    requestBody: searchParams,
  });
};

export default useAlloyPurchases;
