import { TaskType } from "@entities/task/constants/task-type.enum.ts";

export interface TaskTypeSummaries {
  taskType: TaskType;
  totalSpentSeconds: number;
  totalCost: number;
}
