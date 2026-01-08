import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { TaskStatus } from "@entities/task/constants/task-status.ts";

export interface SearchOrderTasksCriteria {
  searchInput?: string;
  orderId?: number;
  statuses?: TaskStatus[];
  metalIds?: number[];
  cylinderIds?: number[];
}

export interface SearchOrderTasksDto extends PageRequestModel {
  searchCriteria: SearchOrderTasksCriteria;
}
