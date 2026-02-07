import { PageRequestModel } from "@shared/types/page-request.model.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import { GEMSTONE_LIST_QUERY_KEY } from "@entities/gemstone/constants/query-keys.ts";
import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";

const useGemstones = (searchConfig: PageRequestModel) => {
  return usePageableRequest({
    fetcher: GemstoneApi.search,
    key: GEMSTONE_LIST_QUERY_KEY,
    requestBody: searchConfig,
  });
};

export default useGemstones;
