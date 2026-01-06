import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { TaskType } from "@entities/task/constants/task-type.enum.ts";

export interface SearchOrderLabourDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    taskTypes?: TaskType[];
    employeeIds?: number[];
    orderIds?: number[];
  };
}
