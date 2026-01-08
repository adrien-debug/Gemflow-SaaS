import { TaskTypeSummaries } from "@entities/task/models/task-type-summaries.model.ts";

export interface LabourSummaryItem {
  taskTypeSummaries: TaskTypeSummaries[];
  totalSpentSeconds: number;
  totalCost: number;
}
