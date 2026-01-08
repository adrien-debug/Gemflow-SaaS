import api from "@shared/api";
import { Pageable } from "@shared/types/pageable.model.ts";
import { SearchStockItemsDto } from "@entities/stock/dto/search-stock-items.dto.ts";
import { StockListItem } from "@entities/stock/models/stock-list-item.model.ts";
import { StockStatistic } from "@entities/order/models/stock-statistic.model.ts";
import { StockItem } from "@entities/stock/models/stock-item.model.ts";
import {
  MarkStockItemMemoOutDto,
  MarkStockItemReturnDto,
  MarkStockItemToSoldDto,
} from "@entities/stock/dto/update-stock-item-status.dto.ts";

const StockApi = {
  search: async (request: SearchStockItemsDto): Promise<Pageable<StockListItem>> => {
    return api.post("/api/v1/orders/stock/search", request);
  },

  getStatistics: async (request: SearchStockItemsDto["searchCriteria"]): Promise<StockStatistic> => {
    return api.post("/api/v1/orders/stock/total", request);
  },

  getStockItemById: async (orderId: number): Promise<StockItem> => {
    return api.get(`/api/v1/orders/${orderId}`);
  },

  markStockItemAsSold: async (orderId: number, dto: MarkStockItemToSoldDto): Promise<StockItem> => {
    return api.patch(`/api/v1/orders/${orderId}/stock/sold`, dto).then();
  },

  markStockItemAsReturned: async (orderId: number, dto: MarkStockItemReturnDto): Promise<StockItem> => {
    return api.patch(`/api/v1/orders/${orderId}/stock/return`, dto).then();
  },

  markStockItemAsMemoOut: async (orderId: number, dto: MarkStockItemMemoOutDto): Promise<StockItem> => {
    return api.patch(`/api/v1/orders/${orderId}/stock/memo-out`, dto).then();
  },
};

export default StockApi;
