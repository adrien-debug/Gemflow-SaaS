import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { START_CAD_QUERY_KEY, TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";

const useStartCad = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [START_CAD_QUERY_KEY],
    mutationFn: (taskId: number) => TasksApi.startCad(taskId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export default useStartCad;
