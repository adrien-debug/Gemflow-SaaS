import { Dayjs } from "dayjs";
import { TaskType } from "@entities/task/constants/task-type.enum.ts";

export interface LogWorkFormSchema {
  employeeId: number;
  taskType: TaskType;
  spentSeconds: number;
  spentMinutes: number;
  date: Dayjs;
}
