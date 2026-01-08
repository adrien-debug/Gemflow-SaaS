import { useQuery } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { CAD_DETAILS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useCadDetails = (orderId: number) => {
  return useQuery({
    queryFn: () => OrdersApi.getCadDetails(orderId),
    queryKey: [CAD_DETAILS_QUERY_KEY, orderId],
  });
};

export default useCadDetails;
