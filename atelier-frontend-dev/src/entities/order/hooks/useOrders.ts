import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { SearchOrderDto } from "@entities/order/dto/search-order.dto.ts";
import { ORDERS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useOrders = (searchParams: SearchOrderDto) => {
  return usePageableRequest({
    fetcher: OrdersApi.search,
    key: ORDERS_QUERY_KEY,
    requestBody: searchParams,
  });
};

export default useOrders;
