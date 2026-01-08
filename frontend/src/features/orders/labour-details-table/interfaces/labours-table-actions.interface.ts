import { TablePaginationConfig } from "antd/es/table/InternalTable";
import { LabourListItem } from "@entities/order/models/labour-list-item.model.ts";

export interface LabourListActions {
  onEditLabour?: (labour: LabourListItem) => void;
  onRowDelete?: (labour: LabourListItem) => void;
  onPageChange?: (config: TablePaginationConfig) => void;
}
