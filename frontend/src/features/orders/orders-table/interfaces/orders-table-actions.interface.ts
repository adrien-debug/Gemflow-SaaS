import { OrderPriority } from "@entities/order/constants/order-priority.enum.ts";
import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";
import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";
import { TablePaginationConfig } from "antd/es/table/InternalTable";

export interface OrderListActions {
  onRowDelete?: (order: OrderListItem) => void;
  onPriorityChange?: (order: OrderListItem, priority: OrderPriority) => void;
  onStatusChange?: (order: OrderListItem, status: OrderStatus) => void;
  onPageChange?: (config: TablePaginationConfig) => void;
  onFilterStatusChange?: (status: OrderStatus[]) => void;
}
