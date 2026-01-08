import { useMutation, useQueryClient } from "@tanstack/react-query";
import CastingTasksApi from "@entities/task/api/casting.api.ts";
import { CASTING_LIST_QUERY_KEY, CASTING_QUERY_KEY } from "@entities/casting/constants/query-keys.ts";

const useUpdateCastingWeight = (taskId: number, castingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (weight: number) => CastingTasksApi.updateCastingWeight(taskId, weight),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [CASTING_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [CASTING_QUERY_KEY, castingId] });
    },
  });
};

export default useUpdateCastingWeight;
