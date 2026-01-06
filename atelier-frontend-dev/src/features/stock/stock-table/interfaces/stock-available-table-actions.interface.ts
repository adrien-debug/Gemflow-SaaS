import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";

export interface StockAvailableTableActions {
  onMarkAsSold?: (order: OrderListItem) => void;
  onMarkAsMemoOut?: (order: OrderListItem) => void;
}
