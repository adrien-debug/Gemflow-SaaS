import { GemstoneStatus } from "@entities/gemstone/constants/gemstone-status.enum";
import { Gemstone } from "@entities/gemstone/models/gemstone.model";
import { TablePaginationConfig } from "antd/es/table";

export interface GemstonesTableActions {
  onDeleteGemstone: (gemstone: Gemstone) => void;
  onPageChange: (config: TablePaginationConfig) => void;
  onFilterLocationChange?: (locationIds: number[]) => void;
  onFilterStatusChange?: (status: GemstoneStatus[]) => void;
  onStatusChange?: (gemstone: Gemstone, status: GemstoneStatus) => void;
  onPaymentStatusChange?: (gemstone: Gemstone, paymentStatusId: number) => void;
}
