import { SearchOrderTasksCriteria } from "@entities/task/dto/search-tasks.dto.ts";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";

const PAGE_SIZE = 100;

export const useInfiniteTasks = (searchCriteria: SearchOrderTasksCriteria) => {
  return useInfiniteQuery({
    queryKey: [TASKS_QUERY_KEY, searchCriteria],
    queryFn: async ({ pageParam = 1 }) =>
      TasksApi.search({
        page: pageParam,
        size: PAGE_SIZE,
        searchCriteria,
      }),
    staleTime: 60000,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
};
