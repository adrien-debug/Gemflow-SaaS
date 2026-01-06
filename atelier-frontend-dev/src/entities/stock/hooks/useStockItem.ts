import { useQuery } from "@tanstack/react-query";
import StockApi from "@entities/stock/api/stock.api.ts";
import { STOCK_ITEM_QUERY_KEY } from "@entities/stock/constants/query-keys.ts";
import { StockItem } from "@entities/stock/models/stock-item.model.ts";

export const useStockItem = (id: number) =>
  useQuery<StockItem>({
    queryKey: [STOCK_ITEM_QUERY_KEY, id],
    queryFn: () => StockApi.getStockItemById(id),
    staleTime: 60000,
  });
