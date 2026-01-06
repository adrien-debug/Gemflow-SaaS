import ClientApi from "@entities/client/api/client.api.ts";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 20;
const CLIENTS_SEARCH_QUERY_KEY = "CLIENTS_SEARCH_QUERY_KEY";

export const useInfiniteClients = (searchInput?: string) =>
  useInfiniteQuery({
    queryKey: [CLIENTS_SEARCH_QUERY_KEY, searchInput],
    queryFn: async (params) =>
      ClientApi.search({
        page: params.pageParam,
        size: PAGE_SIZE,
        searchCriteria: {
          searchInput,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
