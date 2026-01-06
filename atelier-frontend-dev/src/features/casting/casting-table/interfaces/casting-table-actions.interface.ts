import { TablePaginationConfig } from "antd/es/table";
import { CastingListItem } from "@entities/casting/models/casting-list-item.model.ts";

export interface CastingTableActions {
  onPageChange: (config: TablePaginationConfig) => void;
  onDelete: (casting: CastingListItem) => void;
}
