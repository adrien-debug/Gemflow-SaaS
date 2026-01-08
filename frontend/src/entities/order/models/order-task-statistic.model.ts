import { TaskSummaryItem } from "@entities/order/models/task-summary-item.model.ts";
import { OrderTaskStage } from "@entities/order/constants/order-task-stage.enum.ts";

export interface OrderTaskStatistic {
  minStage: OrderTaskStage;
  maxStage: OrderTaskStage;
  summary: TaskSummaryItem[];
}
