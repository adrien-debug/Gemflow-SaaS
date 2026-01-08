import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { SUPPLIERS_LIST_QUERY_KEY } from "@entities/supplier/hooks/constants.ts";
import SuppliersApi from "@entities/supplier/api/supplier.api.ts";

const PAGE_SIZE = 100;

const useInfiniteSuppliers = (searchInput?: string, supplyTypeIds?: number[]) => {
  return useInfiniteQuery({
    queryKey: [SUPPLIERS_LIST_QUERY_KEY, searchInput],
    queryFn: async (params) =>
      SuppliersApi.search({
        page: params.pageParam,
        size: PAGE_SIZE,
        searchCriteria: {
          searchInput,
          supplyTypeIds,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
    placeholderData: keepPreviousData,
  });
};

export default useInfiniteSuppliers;
