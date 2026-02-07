import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { COMPLETE_CAD_QUERY_KEY, TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";
import { CompleteCadDto } from "@entities/task/dto/complete-cad.dto.ts";

const useCompleteCad = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [COMPLETE_CAD_QUERY_KEY],
    mutationFn: ({ taskId, dto }: { taskId: number; dto: CompleteCadDto }) => TasksApi.completeCad(taskId, dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export default useCompleteCad;
