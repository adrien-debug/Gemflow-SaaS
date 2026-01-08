import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { SearchOrderLabourDto } from "@entities/order/dto/search-order-labour.dto.ts";
import { ORDER_LABOURS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useOrderLabours = (searchParams: SearchOrderLabourDto) => {
  return usePageableRequest({
    fetcher: OrdersApi.searchLabours,
    key: ORDER_LABOURS_QUERY_KEY,
    requestBody: searchParams,
  });
};

export default useOrderLabours;
