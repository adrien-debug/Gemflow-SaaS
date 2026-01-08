import AlloysApi from "@entities/alloy/api/alloys.api.ts";
import { ALLOYS_LIST_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { SearchAlloysCriteria } from "@entities/alloy/dto/search-alloys.dto.ts";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 100;

export const useInfiniteAlloys = (searchCriteria: SearchAlloysCriteria) => {
  return useInfiniteQuery({
    queryKey: [ALLOYS_LIST_QUERY_KEY, searchCriteria],
    queryFn: async (params) =>
      AlloysApi.search({
        page: params.pageParam,
        size: PAGE_SIZE,
        searchCriteria,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
};
