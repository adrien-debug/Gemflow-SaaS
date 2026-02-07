import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDER_METAL_TOTALS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useQuery } from "@tanstack/react-query";

export const useOrderMetalTotals = (id: number) =>
  useQuery({
    queryKey: [ORDER_METAL_TOTALS_QUERY_KEY, id],
    queryFn: () => OrdersApi.getOrderMetalTotals(id),
    staleTime: 60000,
  });

export default useOrderMetalTotals;
