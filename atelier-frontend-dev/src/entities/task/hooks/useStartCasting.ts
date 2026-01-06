import { StartCastingDto } from "@entities/task/dto/start-casting.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { START_CASTING_QUERY_KEY, TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";

const useStartCasting = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [START_CASTING_QUERY_KEY],
    mutationFn: (startCastingDto: StartCastingDto) => TasksApi.startCasting(id, startCastingDto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export default useStartCasting;
