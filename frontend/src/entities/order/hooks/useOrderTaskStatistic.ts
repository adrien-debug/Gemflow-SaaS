import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDER_TASKS_STATISTIC_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useQuery } from "@tanstack/react-query";

export const useOrderTaskStatistic = (id: number) =>
  useQuery({
    queryFn: () => OrdersApi.getOrderTaskStatistic(id),
    queryKey: [ORDER_TASKS_STATISTIC_QUERY_KEY, id],
  });
