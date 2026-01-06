import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";

export interface StockStatusItem {
  id: StockItemStatus;
  name: string;
}
