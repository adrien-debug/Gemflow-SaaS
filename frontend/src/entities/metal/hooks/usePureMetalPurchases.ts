import { SearchPureMetalPurchasesDto } from "@entities/metal/dto/search-pure-metal-purchases.dto.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import { PURE_METALS_PURCHASES_LIST_QUERY_KEY } from "@entities/metal/constants/query-keys.ts";
import PureMetalsApi from "@entities/metal/api/pure-metals.api.ts";

const usePureMetalPurchases = (searchConfig: SearchPureMetalPurchasesDto) => {
  return usePageableRequest({
    fetcher: PureMetalsApi.searchPurchases,
    key: PURE_METALS_PURCHASES_LIST_QUERY_KEY,
    requestBody: searchConfig,
  });
};

export default usePureMetalPurchases;
