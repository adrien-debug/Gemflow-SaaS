import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";
import { SearchOrderDto } from "@entities/order/dto/search-order.dto.ts";
import useDeleteOrder from "@entities/order/hooks/useDeleteOrder.ts";
import useOrders from "@entities/order/hooks/useOrders.ts";
import useUpdateOrderPriority from "@entities/order/hooks/useUpdateOrderPriority.ts";
import useUpdateOrderStatus from "@entities/order/hooks/useUpdateOrderStatus.ts";
import { OrderListActions } from "@features/orders/orders-table/interfaces/orders-table-actions.interface.ts";
import OrdersTable from "@features/orders/orders-table/ui/OrdersTable";
import OrdersTableHeader from "@features/orders/orders-table/ui/OrdersTableHeader";
import useModal from "@shared/hooks/useModal.ts";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { TablePaginationConfig } from "antd/es/table/InternalTable";
import { useState } from "react";
import { useMessage } from "@shared/hooks/useMessage.ts";

export const OrdersPage = () => {
  const { modalApi } = useModal();

  const { messageApi } = useMessage();

  const [searchConfig, setSearchConfig] = useState<SearchOrderDto>({
    page: 1,
    size: 10,
    searchCriteria: {},
  });

  const { data, isPending } = useOrders(searchConfig);
  const updateStatus = useUpdateOrderStatus();
  const updatePriority = useUpdateOrderPriority();
  const deleteOrder = useDeleteOrder();

  const actions: OrderListActions = {
    onRowDelete: (order) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete the "${order.name}" order?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteOrder.mutate(order.id, {
            onSuccess: () => {
              void messageApi.success(`Order "${order.name}" successfully deleted`);
            },
            onError: (e) => {
              void messageApi.error(e.data?.friendlyMessage);
            },
          });
        },
        title: "Delete order?",
      });
    },
    onStatusChange: (order, status) => {
      updateStatus.mutate({
        orderId: order.id,
        status,
      });
    },
    onPriorityChange: (order, priority) => {
      updatePriority.mutate({
        orderId: order.id,
        priority,
      });
    },
    onPageChange: (config: TablePaginationConfig) => {
      setSearchConfig((prev) => ({
        ...prev,
        page: config.current as number,
      }));
    },
    onFilterStatusChange: (statuses: OrderStatus[]) => {
      setSearchConfig((prev) => ({
        ...prev,
        searchCriteria: {
          ...prev.searchCriteria,
          statuses,
        },
      }));
    },
  };

  const onSearch = (value: string) => {
    setSearchConfig((prev) => ({
      ...prev,
      page: 1,
      searchCriteria: {
        ...prev.searchCriteria,
        searchInput: value,
      },
    }));
  };

  return (
    <CommonLayout>
      <OrdersTableHeader onSearch={onSearch} />
      <OrdersTable ordersPage={data} actions={actions} loading={isPending} />
    </CommonLayout>
  );
};
