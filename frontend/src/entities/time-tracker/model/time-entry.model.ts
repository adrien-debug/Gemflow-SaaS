import { TaskType } from "@entities/task/constants/task-type.enum.ts";

export interface TimeEntry {
  taskType: TaskType;
  orderId: number;
  totalSeconds: number;
}
