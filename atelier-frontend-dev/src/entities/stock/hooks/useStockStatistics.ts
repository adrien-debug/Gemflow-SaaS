import { SearchStockItemsDto } from "@entities/stock/dto/search-stock-items.dto.ts";
import StockApi from "@entities/stock/api/stock.api.ts";
import { useQuery } from "@tanstack/react-query";
import { STOCK_STATISTIC_QUERY_KEY } from "@entities/stock/constants/query-keys.ts";

const useStockStatistics = (searchParams: SearchStockItemsDto) => {
  return useQuery({
    queryFn: () => StockApi.getStatistics(searchParams?.searchCriteria),
    queryKey: [STOCK_STATISTIC_QUERY_KEY, searchParams?.searchCriteria],
  });
};

export default useStockStatistics;
