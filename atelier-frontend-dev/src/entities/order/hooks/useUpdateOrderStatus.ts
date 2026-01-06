import { ORDER_QUERY_KEY, ORDERS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateStatusDto } from "@entities/order/dto/update-status-dto.ts";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";

const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: UpdateStatusDto) => OrdersApi.updateStatus(orderId, status),
    onMutate: async ({ orderId, status }: UpdateStatusDto) => {
      await queryClient.cancelQueries({ queryKey: [ORDERS_QUERY_KEY] });
      const snapshots = queryClient.getQueriesData<Pageable<OrderListItem>>({ queryKey: [ORDERS_QUERY_KEY] });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, {
            ...snapshot,
            content: snapshot.content.map((order: OrderListItem) => ({
              ...order,
              status: order.id === orderId ? status : order.status,
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
    onSettled: (_, __, { orderId }) => {
      void queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY, orderId] });
    },
  });
};

export default useUpdateOrderStatus;
