import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";
import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";
import { OrderListActions } from "@features/orders/orders-table/interfaces/orders-table-actions.interface.ts";
import { getOrdersTableColumns } from "@features/orders/orders-table/utils/get-orders-table-columns.tsx";
import { FC } from "react";
import { FilterValue } from "antd/es/table/interface";
import { TablePaginationConfig } from "antd/es/table/InternalTable";
import Table from "antd/es/table";
import { Pageable } from "@shared/types/pageable.model.ts";

interface Props {
  actions: OrderListActions;
  loading?: boolean;
  ordersPage?: Pageable<OrderListItem>;
}

const OrdersTable: FC<Props> = ({ ordersPage, actions, loading }) => {
  const columns = getOrdersTableColumns(actions);

  const onChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>) => {
    actions.onPageChange?.(pagination);
    actions.onFilterStatusChange?.(filters.status as OrderStatus[]);
  };

  return (
    <Table
      className="order-table"
      rowKey="id"
      dataSource={ordersPage?.content || []}
      columns={columns}
      onChange={onChange}
      loading={loading}
      pagination={{
        current: ordersPage?.page,
        pageSize: ordersPage?.size,
        total: ordersPage?.totalElements,
        hideOnSinglePage: true,
        showSizeChanger: false,
      }}
    />
  );
};

export default OrdersTable;
