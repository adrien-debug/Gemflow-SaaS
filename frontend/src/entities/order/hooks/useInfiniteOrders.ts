import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { ORDERS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import OrdersApi from "@entities/order/api/orders.api.ts";

const PAGE_SIZE = 40;

const useInfiniteOrders = (searchInput?: string) =>
  useInfiniteQuery({
    queryKey: [ORDERS_QUERY_KEY, searchInput],
    queryFn: async (params) =>
      OrdersApi.search({
        page: params.pageParam,
        size: PAGE_SIZE,
        searchCriteria: {
          searchInput,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });

export default useInfiniteOrders;
