import "./styles.scss";
import Table from "antd/es/table";
import Typography from "antd/es/typography";
import { getLabourTableColumns } from "@features/orders/labour-details-table/utils/get-labour-table-columns.tsx";
import { FC, useState } from "react";
import { LabourListActions } from "@features/orders/labour-details-table/interfaces/labours-table-actions.interface.ts";
import { TablePaginationConfig } from "antd/es/table/InternalTable";
import { SearchOrderLabourDto } from "@entities/order/dto/search-order-labour.dto.ts";
import useModal from "@shared/hooks/useModal.ts";
import useDeleteOrderLabour from "@entities/order/hooks/useDeleteOrderLabour.ts";
import useOrderLabours from "@entities/order/hooks/useOrderLabours.ts";
import EditLabourLogWorkModal from "@features/orders/edit-labour-log-work-modal/ui/EditLabourLogWorkModal";
import { LabourListItem } from "@entities/order/models/labour-list-item.model.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  orderId: number;
  disabled?: boolean;
}

const LabourDetailsTable: FC<Props> = ({ orderId, disabled }) => {
  const { modalApi } = useModal();

  const { messageApi } = useMessage();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [editingLabour, setEditingLabour] = useState<LabourListItem>();

  const [searchConfig, setSearchConfig] = useState<SearchOrderLabourDto>({
    page: 1,
    size: 10,
    searchCriteria: {
      orderIds: [orderId],
    },
  });

  const deleteOrderLabour = useDeleteOrderLabour();

  const actions: LabourListActions = {
    onRowDelete: (labour) => {
      modalApi.confirm({
        cancelText: "No",
        cancelButtonProps: { id: "labour-delete-cancel" },
        centered: true,
        content: `Deleting this time entry will lead to the recalculation of the total labour cost for this order.`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true, id: "labour-delete-confirm" },
        okText: "Yes",
        onOk() {
          deleteOrderLabour.mutate(labour.id, {
            onSuccess: () => {
              void messageApi.success(`${labour.employee.fullName} time entry successfully deleted`);
            },
            onError: () => {
              void messageApi.error(`Failed to delete ${labour.employee.fullName} time entry`);
            },
          });
        },
        title: "Delete time entry?",
      });
    },
    onEditLabour: (labour) => {
      setEditingLabour(labour);
      setModalOpen(true);
    },
    onPageChange: (config: TablePaginationConfig) => {
      setSearchConfig((prev) => ({
        ...prev,
        page: config.current as number,
      }));
    },
  };

  const { data, isPending } = useOrderLabours(searchConfig);

  const columns = getLabourTableColumns(actions, disabled);

  const onChange = (pagination: TablePaginationConfig) => {
    actions.onPageChange?.(pagination);
  };

  return (
    <div className="labour-table-container">
      <Typography.Title className="title" level={4}>
        Time tracking
      </Typography.Title>

      <EditLabourLogWorkModal labour={editingLabour} open={modalOpen} onClose={() => setModalOpen(false)} />

      <Table
        dataSource={data?.content || []}
        columns={columns}
        size="small"
        loading={isPending}
        onChange={onChange}
        rowKey="id"
        pagination={{
          current: data?.page,
          pageSize: data?.size,
          total: data?.totalElements,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default LabourDetailsTable;
