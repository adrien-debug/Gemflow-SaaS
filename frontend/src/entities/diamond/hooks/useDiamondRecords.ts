import { SearchDiamondRecordDto } from "@entities/diamond/dto/search-diamond-record.dto.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import DiamondRecordApi from "@entities/diamond/api/diamond-record.api.ts";
import { DIAMOND_RECORDS_LIST_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";

const useDiamondRecords = (searchConfig: SearchDiamondRecordDto) => {
  return usePageableRequest({
    fetcher: DiamondRecordApi.search,
    key: DIAMOND_RECORDS_LIST_QUERY_KEY,
    requestBody: searchConfig,
  });
};

export default useDiamondRecords;
