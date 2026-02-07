import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";

export interface UpdateStatusDto {
  orderId: number;
  status: OrderStatus;
}
