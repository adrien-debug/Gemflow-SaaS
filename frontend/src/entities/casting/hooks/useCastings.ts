import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import CastingApi from "@entities/casting/api/casting.api.ts";
import { CASTING_LIST_QUERY_KEY } from "@entities/casting/constants/query-keys.ts";
import { CastingSearchDto } from "@entities/casting/dto/casting-search.dto.ts";

const useCastings = (searchBody: CastingSearchDto) => {
  return usePageableRequest({
    fetcher: CastingApi.search,
    key: CASTING_LIST_QUERY_KEY,
    requestBody: searchBody,
  });
};

export default useCastings;
