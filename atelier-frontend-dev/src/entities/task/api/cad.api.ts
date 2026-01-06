import api from "@shared/api";
import { SendCadToReviewDto } from "@entities/task/dto/send-cad-to-review.dto.ts";
import { CompleteCadDto } from "@entities/task/dto/complete-cad.dto.ts";

const CadTasksApi = {
  startCad: async (taskId: number): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${taskId}/cad/start`);
  },

  sendCadToReview: async (taskId: number, dto: SendCadToReviewDto): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${taskId}/cad/review`, dto);
  },

  restartCad: async (taskId: number): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${taskId}/cad/restart`);
  },

  completeCad: async (taskId: number, dto: CompleteCadDto): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${taskId}/cad/complete`, dto);
  },
};

export default CadTasksApi;
