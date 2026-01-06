import AlloysApi from "@entities/alloy/api/alloys.api.ts";
import { ALLOYS_LIST_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { SearchAlloysDto } from "@entities/alloy/dto/search-alloys.dto.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";

const useAlloys = (searchParams: SearchAlloysDto) => {
  return usePageableRequest({
    fetcher: AlloysApi.search,
    key: ALLOYS_LIST_QUERY_KEY,
    requestBody: searchParams,
  });
};

export default useAlloys;
