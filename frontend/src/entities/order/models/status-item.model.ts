import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";

export interface OrderStatusItem {
  id: OrderStatus;
  name: string;
}
