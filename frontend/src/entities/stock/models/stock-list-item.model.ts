import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";
import { StockItemMetadata } from "@entities/stock/models/stock-item-metadata.model.ts";

export interface StockListItem extends OrderListItem {
  stock: StockItemMetadata;
}
