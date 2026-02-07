import { QueryClient } from "@tanstack/react-query";
import { STOCK_ITEMS_LIST_QUERY_KEY } from "@entities/stock/constants/query-keys.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { StockItem } from "@entities/stock/models/stock-item.model.ts";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";

export const updateStockItemSnapshots = (status: StockItemStatus, queryClient: QueryClient) => {
  return async () => {
    await queryClient.cancelQueries({ queryKey: [STOCK_ITEMS_LIST_QUERY_KEY] });

    const snapshots = queryClient.getQueriesData<Pageable<StockItem>>({
      queryKey: [STOCK_ITEMS_LIST_QUERY_KEY],
    });

    snapshots.forEach(([queryKey, snapshot]) => {
      if (snapshot) {
        const updatedContent = snapshot.content?.map((stockItem) => ({
          ...stockItem,
          stock: {
            ...stockItem.stock,
            status,
          },
        }));

        queryClient.setQueryData(queryKey, {
          ...snapshot,
          content: updatedContent,
        });
      }
    });

    return { snapshots };
  };
};
