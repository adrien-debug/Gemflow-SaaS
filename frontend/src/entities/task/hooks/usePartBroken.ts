import { PartBrokenDto } from "@entities/task/dto/part-broken.dto.ts";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { PART_BROKEN_QUERY_KEY, TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { Task } from "@entities/task/models/task.model.ts";

const usePartBroken = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [PART_BROKEN_QUERY_KEY],
    mutationFn: (partBrokenDto: PartBrokenDto) => TasksApi.partBroken(id, partBrokenDto),
    onMutate: async (partBrokenDto) => {
      await queryClient.cancelQueries({ queryKey: [TASKS_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData<InfiniteData<Pageable<Task>>>({
        queryKey: [TASKS_QUERY_KEY],
      });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: InfiniteData<Pageable<Task>>) => {
            if (!old) return old;

            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                content: page.content.map((task) =>
                  task.id === id
                    ? { ...task, stlCount: partBrokenDto.stlCount, orderTaskImages: partBrokenDto.orderTaskImages }
                    : task,
                ),
              })),
            };
          });
        }
      });

      return { snapshots };
    },
    onError: (_, __, context) => {
      context?.snapshots?.forEach(([queryKey, snapshot]) => {
        queryClient.setQueryData(queryKey, snapshot);
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export default usePartBroken;
