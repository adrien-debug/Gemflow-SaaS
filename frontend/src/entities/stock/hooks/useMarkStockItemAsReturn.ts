import { useMutation, useQueryClient } from "@tanstack/react-query";
import StockApi from "@entities/stock/api/stock.api.ts";
import {
  STOCK_ITEM_QUERY_KEY,
  STOCK_ITEMS_LIST_QUERY_KEY,
  STOCK_STATISTIC_QUERY_KEY,
} from "@entities/stock/constants/query-keys.ts";
import { updateStockItemSnapshots } from "@entities/stock/utils/update-stock-item-snapshots.ts";
import { MarkStockItemReturnDto } from "@entities/stock/dto/update-stock-item-status.dto.ts";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";

const useMarkStockItemAsReturn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, dto }: { orderId: number; dto: MarkStockItemReturnDto }) =>
      StockApi.markStockItemAsReturned(orderId, dto),

    onMutate: updateStockItemSnapshots(StockItemStatus.AVAILABLE, queryClient),

    onError: (_, __, context) => {
      context?.snapshots?.forEach(([queryKey, snapshot]) => {
        queryClient.setQueryData(queryKey, snapshot);
      });
    },

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [STOCK_STATISTIC_QUERY_KEY] }),
        queryClient.invalidateQueries({ queryKey: [STOCK_ITEM_QUERY_KEY] }),
        queryClient.invalidateQueries({ queryKey: [STOCK_ITEMS_LIST_QUERY_KEY] }),
      ]);
    },
  });
};

export default useMarkStockItemAsReturn;
