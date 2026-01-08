import { AlloyedMetalsApi } from "@entities/alloyed-metal/api/alloyed-metals.api.ts";
import { ALLOYED_METALS_LIST_QUERY_KEY } from "@entities/alloyed-metal/constants/query-keys.ts";
import { SearchAlloyedMetalsDto } from "@entities/alloyed-metal/dto/search-alloyed-metals.dto.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";

const useAlloyedMetals = (searchParams: SearchAlloyedMetalsDto) => {
  return usePageableRequest({
    fetcher: AlloyedMetalsApi.search,
    key: ALLOYED_METALS_LIST_QUERY_KEY,
    requestBody: searchParams,
  });
};

export default useAlloyedMetals;
