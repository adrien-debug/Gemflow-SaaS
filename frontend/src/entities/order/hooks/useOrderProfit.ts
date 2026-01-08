import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDER_PROFIT_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useQuery } from "@tanstack/react-query";

export const useOrderProfit = (id: number) =>
  useQuery({
    queryKey: [ORDER_PROFIT_QUERY_KEY, id],
    queryFn: () => OrdersApi.getOrderProfit(id),
    staleTime: 60000,
  });
