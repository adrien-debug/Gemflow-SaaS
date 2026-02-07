import { AlloyedMetalsApi } from "@entities/alloyed-metal/api/alloyed-metals.api.ts";
import { ALLOYED_METALS_LIST_QUERY_KEY } from "@entities/alloyed-metal/constants/query-keys.ts";
import { SearchAlloyedMetalsDto } from "@entities/alloyed-metal/dto/search-alloyed-metals.dto.ts";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 100;

export const useInfiniteAlloyedMetals = (searchConfig: Pick<SearchAlloyedMetalsDto, "searchCriteria">) => {
  return useInfiniteQuery({
    queryKey: [ALLOYED_METALS_LIST_QUERY_KEY, searchConfig],
    queryFn: async (params) =>
      AlloyedMetalsApi.search({
        page: params.pageParam,
        size: PAGE_SIZE,
        searchCriteria: searchConfig.searchCriteria,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
};
