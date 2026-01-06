import { Order } from "@entities/order/models/order.model.ts";
import { StockItemMetadata } from "@entities/stock/models/stock-item-metadata.model.ts";

export interface StockItem extends Order {
  stock: StockItemMetadata;
}
