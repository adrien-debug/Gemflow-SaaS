import { CompleteCastingDto } from "@entities/task/dto/complete-casting.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { COMPLETE_CASTING_QUERY_KEY, TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";

const useCompleteCasting = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [COMPLETE_CASTING_QUERY_KEY],
    mutationFn: (completeCastingDto: CompleteCastingDto) => TasksApi.completeCasting(id, completeCastingDto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export default useCompleteCasting;
