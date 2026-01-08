import { useQuery } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { ORDER_TECHNICAL_SHEET_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useTechnicalSheet = (orderId: number) => {
  return useQuery({
    queryFn: () => OrdersApi.getTechnicalSheet(orderId),
    queryKey: [ORDER_TECHNICAL_SHEET_QUERY_KEY, orderId],
  });
};

export default useTechnicalSheet;
