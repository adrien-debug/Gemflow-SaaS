import { StockItemStatus, stockItemStatusNameMap } from "@entities/stock/constants/stock-item-status.enum.ts";
import { StockStatusItem } from "@entities/stock/models/stock-status-item.model.ts";

export const generateStockItemStatuses = (): StockStatusItem[] => {
  return Object.values(StockItemStatus).map((status) => ({
    id: status,
    name: stockItemStatusNameMap[status],
  }));
};
