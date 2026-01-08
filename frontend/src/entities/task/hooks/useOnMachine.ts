import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { ON_MACHINE_QUERY_KEY, TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";

const useOnMachine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [ON_MACHINE_QUERY_KEY],
    mutationFn: (taskId: number) => TasksApi.onMachine(taskId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export default useOnMachine;
