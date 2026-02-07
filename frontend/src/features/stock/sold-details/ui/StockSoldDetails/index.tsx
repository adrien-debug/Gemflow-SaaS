import StockSoldStatistic from "@features/stock/sold-statistic/ui/StockSoldStatistic";
import Flex from "antd/es/flex";
import { FC } from "react";
import StockTable from "@features/stock/stock-table/ui/StockTable";
import { getStockSoldTableColumns } from "@features/stock/stock-table/utils/get-stock-sold-table-columns.tsx";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";

interface Props {
  searchInput: string;
}

const StockSoldDetails: FC<Props> = ({ searchInput }) => {
  const columns = getStockSoldTableColumns();
  return (
    <Flex vertical gap={8}>
      <StockSoldStatistic searchInput={searchInput} stockStatuses={[StockItemStatus.SOLD]} />
      <StockTable searchInput={searchInput} columns={columns} stockStatuses={[StockItemStatus.SOLD]} />
    </Flex>
  );
};

export default StockSoldDetails;
