import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";
import { GEMSTONES_SEARCH_QUERY_KEY } from "@entities/gemstone/constants/query-keys.ts";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { SearchGemstoneDto } from "@entities/gemstone/dto/search-gemstone.dto";

const PAGE_SIZE = 100;

export const useInfiniteGemstones = (searchConfig: Pick<SearchGemstoneDto, "searchCriteria">) => {
  return useInfiniteQuery({
    queryKey: [GEMSTONES_SEARCH_QUERY_KEY, searchConfig.searchCriteria],
    queryFn: async (params) =>
      GemstoneApi.search({
        page: params.pageParam,
        size: PAGE_SIZE,
        searchCriteria: searchConfig.searchCriteria,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
};
