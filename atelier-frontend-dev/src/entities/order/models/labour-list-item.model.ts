import { TaskType } from "@entities/task/constants/task-type.enum.ts";
import { User } from "@entities/user/models/user.model.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";

export interface LabourListItem {
  id: number;
  taskType: TaskType;
  spentSeconds: number;
  date: string;
  employee: Omit<User, "isActive" | "email" | "role">;
  order: BaseItem;
}
