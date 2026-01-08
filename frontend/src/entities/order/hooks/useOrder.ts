import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDER_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { Order } from "@entities/order/models/order.model.ts";
import { useQuery } from "@tanstack/react-query";

export const useOrder = (id: number) =>
  useQuery<Order>({
    queryKey: [ORDER_QUERY_KEY, id],
    queryFn: () => OrdersApi.getById(id),
    staleTime: 60000,
    enabled: !!id,
  });
