import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDER_LABOURS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useQuery } from "@tanstack/react-query";

export const useLaboursSummary = (id: number) =>
  useQuery({
    queryKey: [ORDER_LABOURS_QUERY_KEY, id],
    queryFn: () => OrdersApi.getLabourSummary(id),
    staleTime: 60000,
  });
