import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDER_PROFIT_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useUpdateMetalsProfit = (orderId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profitPercentage: number) => OrdersApi.updateOrderMetalsProfit(orderId, profitPercentage),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [ORDER_PROFIT_QUERY_KEY] });
    },
  });
};

export default useUpdateMetalsProfit;
