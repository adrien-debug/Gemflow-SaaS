import Select, { SelectProps } from "antd/es/select";
import "./styles.scss";
import { FC, useEffect, useState } from "react";
import { generateStockItemStatuses } from "@entities/stock/utils/generate-stock-item-statuses.ts";
import SoldModal from "@features/stock/sold-modal/ui/SoldModal";
import MemoOutModal from "@features/stock/memo-out-modal/ui/MemoOutModal";
import ReturnedModal from "@features/stock/returned-modal/ui/ReturnedModal";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";
import { StockItem } from "@entities/stock/models/stock-item.model.ts";

interface Props extends SelectProps {
  stockItem: StockItem;
}

const StockItemStatusSelect: FC<Props> = ({ stockItem, ...rest }) => {
  const data = generateStockItemStatuses();

  const [isReturnedModalOpen, setIsReturnedModalOpen] = useState<boolean>(false);
  const [isSoldModalOpen, setIsSoldModalOpen] = useState<boolean>(false);
  const [isMemoOutModalOpen, setIsMemoOutModalOpen] = useState<boolean>(false);

  const [updatedStatus, setUpdatedStatus] = useState<StockItemStatus | undefined>(stockItem?.stock.status);

  const statusModalMap: Record<StockItemStatus, () => void> = {
    [StockItemStatus.SOLD]: () => setIsSoldModalOpen(true),
    [StockItemStatus.MEMO_OUT]: () => setIsMemoOutModalOpen(true),
    [StockItemStatus.AVAILABLE]: () => setIsReturnedModalOpen(true),
  };

  const closeAllModals = () => {
    setIsSoldModalOpen(false);
    setIsMemoOutModalOpen(false);
    setIsReturnedModalOpen(false);
  };

  const handleStatusChange = (newStatus: StockItemStatus) => {
    setUpdatedStatus(newStatus);
    statusModalMap[newStatus]?.();
  };

  const handleModalVisibilityChange = (visible: boolean) => {
    if (!visible) {
      closeAllModals();
      setUpdatedStatus(stockItem?.stock.status);
    }
  };

  useEffect(() => {
    setUpdatedStatus(stockItem?.stock?.status);
  }, [stockItem]);

  return (
    <>
      <Select
        popupMatchSelectWidth={false}
        className="stock-item-status-select"
        size="large"
        value={updatedStatus}
        onChange={handleStatusChange}
        disabled={updatedStatus === StockItemStatus.SOLD}
        placeholder={"Choose status"}
        fieldNames={{ value: "id", label: "name" }}
        options={data}
        {...rest}
      />

      <SoldModal
        open={isSoldModalOpen}
        setIsSoldModalOpen={(isOpen) => handleModalVisibilityChange(isOpen)}
        orderId={stockItem.id}
      />

      <MemoOutModal
        open={isMemoOutModalOpen}
        setIsMemoOutModalOpen={(isOpen) => handleModalVisibilityChange(isOpen)}
        orderId={stockItem.id}
      />

      <ReturnedModal
        open={isReturnedModalOpen}
        setIsReturnedModalOpen={(isOpen) => handleModalVisibilityChange(isOpen)}
        issuedTo={stockItem}
      />
    </>
  );
};

export default StockItemStatusSelect;
