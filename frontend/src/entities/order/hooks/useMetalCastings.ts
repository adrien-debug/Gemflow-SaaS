import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDER_METAL_CASTINGS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useQuery } from "@tanstack/react-query";

export const useMetalCastings = (id: number) =>
  useQuery({
    queryKey: [ORDER_METAL_CASTINGS_QUERY_KEY, id],
    queryFn: () => OrdersApi.getMetalCastings(id),
    staleTime: 60000,
  });

export default useMetalCastings;
