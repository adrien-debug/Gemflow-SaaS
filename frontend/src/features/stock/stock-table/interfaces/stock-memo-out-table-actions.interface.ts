import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";

export interface StockMemoOutTableActions {
  onStockItemReturn?: (order: OrderListItem) => void;
}
