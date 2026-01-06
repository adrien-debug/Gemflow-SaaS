import { TaskType, TaskTypeNameMap } from "@entities/task/constants/task-type.enum.ts";
import { TaskTypeItem } from "@entities/task/models/task-type-item.model.ts";

export const generateTaskType = (): TaskTypeItem[] => {
  return Object.values(TaskType).map((type) => ({
    id: type,
    name: TaskTypeNameMap[type],
  }));
};
