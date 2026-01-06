import { OrderStatus, orderStatusNameMap } from "@entities/order/constants/order-status.enum.ts";
import { OrderStatusItem } from "@entities/order/models/status-item.model.ts";

export const generateOrderStatuses = (): OrderStatusItem[] => {
  return Object.values(OrderStatus).map((status) => ({
    id: status,
    name: orderStatusNameMap[status],
  }));
};
