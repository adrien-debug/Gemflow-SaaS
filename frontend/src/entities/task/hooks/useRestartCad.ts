import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { RESTART_CAD_QUERY_KEY, TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";

const useRestartCad = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [RESTART_CAD_QUERY_KEY],
    mutationFn: (taskId: number) => TasksApi.restartCad(taskId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export default useRestartCad;
