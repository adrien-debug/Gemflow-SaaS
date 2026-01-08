import { MoveToCastingDto } from "@entities/task/dto/move-to-casting.dto.ts";
import api from "@shared/api";

const PrintingTasksApi = {
  onMachine: async (taskId: number): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${taskId}/3d-printing/start`);
  },

  moveToCasting: async (taskId: number, dto: MoveToCastingDto): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${taskId}/3d-printing/complete`, dto);
  },
};

export default PrintingTasksApi;
