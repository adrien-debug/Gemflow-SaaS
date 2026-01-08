import usePageableRequest from "@shared/hooks/usePageableRequest.ts";
import { SearchStockItemsDto } from "@entities/stock/dto/search-stock-items.dto.ts";
import { STOCK_ITEMS_LIST_QUERY_KEY } from "@entities/stock/constants/query-keys.ts";
import StockApi from "@entities/stock/api/stock.api.ts";

const useStockItems = (searchParams: SearchStockItemsDto) => {
  return usePageableRequest({
    fetcher: StockApi.search,
    key: STOCK_ITEMS_LIST_QUERY_KEY,
    requestBody: searchParams,
  });
};

export default useStockItems;
