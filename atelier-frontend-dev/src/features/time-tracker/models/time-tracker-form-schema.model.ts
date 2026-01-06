import { TaskType } from "@entities/task/constants/task-type.enum.ts";

export interface TimeTrackerFormSchema {
  taskType: TaskType;
}
