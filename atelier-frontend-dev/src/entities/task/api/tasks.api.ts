import PrintingTasksApi from "@entities/task/api/3d-printing.api.ts";
import CadTasksApi from "@entities/task/api/cad.api.ts";
import CastingTasksApi from "@entities/task/api/casting.api.ts";
import { PartBrokenDto } from "@entities/task/dto/part-broken.dto.ts";
import { Task } from "@entities/task/models/task.model.ts";
import { SearchOrderTasksDto } from "@entities/task/dto/search-tasks.dto.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import api from "@shared/api";

const TasksApi = {
  search: async (dto: SearchOrderTasksDto): Promise<Pageable<Task>> => {
    return api.post(`/api/v1/order-tasks/search`, dto);
  },

  partBroken: async (id: number, dto: PartBrokenDto): Promise<void> => {
    return api.patch(`/api/v1/order-tasks/${id}/part-broken`, dto);
  },

  ...CadTasksApi,
  ...PrintingTasksApi,
  ...CastingTasksApi,
};

export default TasksApi;
