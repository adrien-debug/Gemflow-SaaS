import { MoveToCastingDto } from "@entities/task/dto/move-to-casting.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { MOVE_TO_CASTING_QUERY_KEY, TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";

const useMoveToCasting = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MOVE_TO_CASTING_QUERY_KEY],
    mutationFn: (moveToCastingDto: MoveToCastingDto) => TasksApi.moveToCasting(id, moveToCastingDto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export default useMoveToCasting;
