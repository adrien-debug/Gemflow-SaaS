import { TaskStatus } from "@entities/task/constants/task-status.ts";

export interface PreCastingFilterSchema {
  statuses?: TaskStatus[];
  metalIds?: number[];
  cylinderIds?: number[];
}
