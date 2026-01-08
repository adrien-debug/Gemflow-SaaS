import { TaskType } from "@entities/task/constants/task-type.enum.ts";

export interface TaskTypeItem {
  id: TaskType;
  name: string;
}
