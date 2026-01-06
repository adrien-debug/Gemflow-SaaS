import { ORDERS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdatePriorityDto } from "@entities/order/dto/update-priority-dto.ts";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";

const useUpdateOrderPriority = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, priority }: UpdatePriorityDto) => OrdersApi.updatePriority(orderId, priority),
    onMutate: async ({ orderId, priority }) => {
      await queryClient.cancelQueries({ queryKey: [ORDERS_QUERY_KEY] });
      const snapshots = queryClient.getQueriesData<Pageable<OrderListItem>>({ queryKey: [ORDERS_QUERY_KEY] });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, {
            ...snapshot,
            content: snapshot.content.map((order: OrderListItem) => ({
              ...order,
              priority: order.id === orderId ? priority : order.priority,
            })),
          });
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

export default useUpdateOrderPriority;
