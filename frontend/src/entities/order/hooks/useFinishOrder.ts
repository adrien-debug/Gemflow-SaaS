import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDERS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useFinishOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, locationId }: { orderId: number; locationId: number }) =>
      OrdersApi.finish(orderId, locationId),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [ORDERS_QUERY_KEY] });
    },
  });
};

export default useFinishOrder;
