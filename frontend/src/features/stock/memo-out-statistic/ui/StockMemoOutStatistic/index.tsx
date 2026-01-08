import LabelValueCard from "@shared/ui/LabelValueCard";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
import Flex from "antd/es/flex";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";
import { FC, useEffect, useState } from "react";
import { SearchStockItemsDto } from "@entities/stock/dto/search-stock-items.dto.ts";
import useStockStatistics from "@entities/stock/hooks/useStockStatistics.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";

interface Props {
  searchInput: string;
  stockStatuses?: StockItemStatus[];
}

const StockMemoOutStatistic: FC<Props> = ({ searchInput, stockStatuses }) => {
  const [searchConfig, setSearchConfig] = useState<SearchStockItemsDto>({
    searchCriteria: { searchInput, statuses: stockStatuses },
  });

  useEffect(() => {
    setSearchConfig((prev) => ({
      searchCriteria: { ...prev.searchCriteria, searchInput, statuses: stockStatuses },
    }));
  }, [searchInput, stockStatuses]);

  const { data, isFetching } = useStockStatistics(searchConfig);

  return (
    <Flex gap={8}>
      <LabelValueCard label="Items memoed out" loading={isFetching}>
        {data?.totalCount}
      </LabelValueCard>

      <LabelValueCard label="Total value" loading={isFetching}>
        {`$${moneyFormatter(data?.totalCost, 2)}`}
      </LabelValueCard>

      <LabelValueCard
        label={`Total adjusted value (${dayjs().format(DateFormat.LiteralMontDayYear)})`}
        loading={isFetching}>
        {`$${moneyFormatter(data?.totalAdjustedCost, 2)}`}
      </LabelValueCard>
    </Flex>
  );
};

export default StockMemoOutStatistic;
