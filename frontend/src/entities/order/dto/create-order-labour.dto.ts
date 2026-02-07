import { TaskType } from "@entities/task/constants/task-type.enum.ts";

export interface CreateOrderLabourDto {
  taskType: TaskType;
  spentSeconds: number;
  date: string;
  employeeId: number;
  orderId: number;
}
