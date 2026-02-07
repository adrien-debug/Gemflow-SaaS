import { useMutation, useQueryClient } from "@tanstack/react-query";
import TasksApi from "@entities/task/api/tasks.api.ts";
import { SEND_CAD_TO_REVIEW_QUERY_KEY, TASKS_QUERY_KEY } from "@entities/task/constants/query-keys.ts";
import { SendCadToReviewDto } from "@entities/task/dto/send-cad-to-review.dto.ts";

const useSendCadToReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [SEND_CAD_TO_REVIEW_QUERY_KEY],
    mutationFn: ({ taskId, dto }: { taskId: number; dto: SendCadToReviewDto }) => TasksApi.sendCadToReview(taskId, dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [TASKS_QUERY_KEY] });
    },
  });
};

export default useSendCadToReview;
