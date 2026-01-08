import StockAvailableStatistic from "@features/stock/available-statistic/ui/StockAvailableStatistic";
import Flex from "antd/es/flex";
import { FC, useState } from "react";
import StockTable from "@features/stock/stock-table/ui/StockTable";
import { getStockAvailableTableColumns } from "@features/stock/stock-table/utils/get-stock-available-table-columns.tsx";
import { StockAvailableTableActions } from "@features/stock/stock-table/interfaces/stock-available-table-actions.interface.ts";
import SoldModal from "@features/stock/sold-modal/ui/SoldModal";
import MemoOutModal from "@features/stock/memo-out-modal/ui/MemoOutModal";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";

interface Props {
  searchInput: string;
}

const StockAvailableDetails: FC<Props> = ({ searchInput }) => {
  const [isSoldModalOpen, setIsSoldModalOpen] = useState<boolean>(false);
  const [isMemoOutModalOpen, setIsMemoOutModalOpen] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const actions: StockAvailableTableActions = {
    onMarkAsSold: (order) => {
      setIsSoldModalOpen(true);
      setSelectedOrderId(order.id);
    },
    onMarkAsMemoOut: (order) => {
      setIsMemoOutModalOpen(true);
      setSelectedOrderId(order.id);
    },
  };

  const columns = getStockAvailableTableColumns(actions);

  return (
    <Flex vertical gap={8}>
      <StockAvailableStatistic searchInput={searchInput} stockStatuses={[StockItemStatus.AVAILABLE]} />

      <StockTable searchInput={searchInput} columns={columns} stockStatuses={[StockItemStatus.AVAILABLE]} />

      <SoldModal open={isSoldModalOpen} setIsSoldModalOpen={setIsSoldModalOpen} orderId={selectedOrderId} />

      <MemoOutModal open={isMemoOutModalOpen} setIsMemoOutModalOpen={setIsMemoOutModalOpen} orderId={selectedOrderId} />
    </Flex>
  );
};

export default StockAvailableDetails;
