import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { DIAMOND_RECORDS_LIST_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";
import DiamondRecordApi from "@entities/diamond/api/diamond-record.api.ts";
import { SearchDiamondRecordDto } from "@entities/diamond/dto/search-diamond-record.dto.ts";

const PAGE_SIZE = 100;

const useInfiniteDiamondRecords = (searchConfig: Pick<SearchDiamondRecordDto, "searchCriteria">) =>
  useInfiniteQuery({
    queryKey: [DIAMOND_RECORDS_LIST_QUERY_KEY, searchConfig],
    queryFn: async (params) =>
      DiamondRecordApi.search({
        page: params.pageParam,
        size: PAGE_SIZE,
        searchCriteria: searchConfig.searchCriteria,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });

export default useInfiniteDiamondRecords;
