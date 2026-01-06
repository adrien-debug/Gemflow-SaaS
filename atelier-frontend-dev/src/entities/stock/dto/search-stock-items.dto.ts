import { PageRequestModel } from "@shared/types/page-request.model.ts";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";

export interface SearchStockItemsDto extends PageRequestModel {
  searchCriteria: {
    searchInput?: string;
    statuses?: StockItemStatus[];
  };
}
