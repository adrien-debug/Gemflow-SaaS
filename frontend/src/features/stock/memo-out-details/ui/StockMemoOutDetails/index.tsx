import { FC, useState } from "react";
import StockTable from "@features/stock/stock-table/ui/StockTable";
import { getStockMemoOutTableColumns } from "@features/stock/stock-table/utils/get-stock-memo-out-table-columns.tsx";
import { StockMemoOutTableActions } from "@features/stock/stock-table/interfaces/stock-memo-out-table-actions.interface.ts";
import ReturnedModal from "@features/stock/returned-modal/ui/ReturnedModal";
import StockMemoOutStatistic from "@features/stock/memo-out-statistic/ui/StockMemoOutStatistic";
import Flex from "antd/es/flex";
import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";
import { StockListItem } from "@entities/stock/models/stock-list-item.model.ts";

interface Props {
  searchInput: string;
}

const StockMemoOutDetails: FC<Props> = ({ searchInput }) => {
  const [isReturnedModalOpen, setIsReturnedModalOpen] = useState<boolean>(false);
  const [issuedTo, setIssuedTo] = useState<OrderListItem>();

  const actions: StockMemoOutTableActions = {
    onStockItemReturn: (order) => {
      setIsReturnedModalOpen(true);
      setIssuedTo(order);
    },
  };

  const columns = getStockMemoOutTableColumns(actions);

  return (
    <Flex vertical gap={8}>
      <StockMemoOutStatistic searchInput={searchInput} stockStatuses={[StockItemStatus.MEMO_OUT]} />

      <StockTable searchInput={searchInput} columns={columns} stockStatuses={[StockItemStatus.MEMO_OUT]} />

      <ReturnedModal
        open={isReturnedModalOpen}
        setIsReturnedModalOpen={setIsReturnedModalOpen}
        issuedTo={issuedTo as StockListItem}
      />
    </Flex>
  );
};

export default StockMemoOutDetails;
