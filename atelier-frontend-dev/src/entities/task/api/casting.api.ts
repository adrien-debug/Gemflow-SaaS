import { CompleteCastingDto } from "@entities/task/dto/complete-casting.dto.ts";
import { StartCastingDto } from "@entities/task/dto/start-casting.dto.ts";
import api from "@shared/api";

const CastingTasksApi = {
  startCasting: async (taskId: number, startCastingDto: StartCastingDto): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${taskId}/casting/start`, startCastingDto);
  },

  completeCasting: async (taskId: number, dto: CompleteCastingDto): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${taskId}/casting/complete`, dto);
  },

  updateCastingWeight: async (taskId: number, weight: number): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${taskId}/casting/weight`, { weight });
  },
};

export default CastingTasksApi;
