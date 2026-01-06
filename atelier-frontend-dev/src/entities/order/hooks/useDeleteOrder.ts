import { ORDERS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";

const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: number) => OrdersApi.delete(orderId),
    onMutate: async (orderId: number) => {
      await queryClient.cancelQueries({ queryKey: [ORDERS_QUERY_KEY] });
      const snapshots = queryClient.getQueriesData<Pageable<OrderListItem>>({ queryKey: [ORDERS_QUERY_KEY] });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<OrderListItem>) => ({
            ...snapshot,
            content: old.content.filter((order: OrderListItem) => order.id !== orderId),
          }));
        }
      });

      return { snapshots };
    },
    onError: (_, __, context) => {
      context?.snapshots?.forEach(([queryKey, snapshot]) => {
        queryClient.setQueryData(queryKey, snapshot);
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
    },
  });
};

export default useDeleteOrder;
