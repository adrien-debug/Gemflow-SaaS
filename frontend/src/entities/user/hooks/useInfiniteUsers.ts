import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import UserApi from "@entities/user/api/user.api.ts";
import { USER_LIST_QUERY_KEY } from "@entities/user/constants/user-query-keys.ts";
import { SearchInfiniteUsersDto } from "@entities/user/dto/search-infinite-user.dto.ts";

const PAGE_SIZE = 100;

const useInfiniteUsers = (searchConfig: SearchInfiniteUsersDto) =>
  useInfiniteQuery({
    queryKey: [USER_LIST_QUERY_KEY, searchConfig.searchCriteria],
    queryFn: async (params) =>
      UserApi.search({
        page: params.pageParam,
        size: PAGE_SIZE,
        searchCriteria: searchConfig.searchCriteria,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });

export default useInfiniteUsers;
