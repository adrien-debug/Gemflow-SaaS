import { OrderTaskStage } from "@entities/order/constants/order-task-stage.enum.ts";

export interface TaskSummaryItem {
  stage: OrderTaskStage;
  count: number;
}
