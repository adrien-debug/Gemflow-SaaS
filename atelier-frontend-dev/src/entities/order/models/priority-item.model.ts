import { OrderPriority } from "@entities/order/constants/order-priority.enum.ts";

export interface OrderPriorityItem {
  id: OrderPriority;
  name: string;
}
