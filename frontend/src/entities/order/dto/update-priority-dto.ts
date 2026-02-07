import { OrderPriority } from "@entities/order/constants/order-priority.enum.ts";

export interface UpdatePriorityDto {
  orderId: number;
  priority: OrderPriority;
}
