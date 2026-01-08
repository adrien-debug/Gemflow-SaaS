import { OrderPriority, orderPriorityNameMap } from "@entities/order/constants/order-priority.enum.ts";
import { OrderPriorityItem } from "@entities/order/models/priority-item.model.ts";

export const generateOrderPriorities = (): OrderPriorityItem[] => {
  return Object.values(OrderPriority).map((priority) => ({
    id: priority,
    name: orderPriorityNameMap[priority],
  }));
};
