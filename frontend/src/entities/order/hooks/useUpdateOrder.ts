import { UpdateOrderDto } from "@entities/order/dto/update-order.dto.ts";
import { ORDER_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";

const useUpdateOrder = (orderId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateOrderDto: UpdateOrderDto) => OrdersApi.update(orderId, updateOrderDto),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY, orderId] });
    },
  });
};

export default useUpdateOrder;
