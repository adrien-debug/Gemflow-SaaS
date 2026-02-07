import "./styles.scss";
import { FC, useState } from "react";
import { DiamondUsageTableActions } from "@features/diamonds/diamond-usage-table/interfaces/diamond-usage-table-actions.interface.ts";
import { getDiamondUsageColumns } from "@features/diamonds/diamond-usage-table/utils/get-diamond-usage-columns.util.tsx";
import Table from "antd/es/table";
import useModal from "@shared/hooks/useModal.ts";
import { TablePaginationConfig } from "antd/es/table/InternalTable";
import { DIAMOND_TABLE_PAGE_SIZE } from "@features/diamonds/diamond-usage-table/constants/diamond-table.constants.ts";
import { SearchDiamondUsageDto } from "@entities/diamond/dto/search-diamond-usage.dto.ts";
import useDiamondUsage from "@entities/diamond/hooks/useDiamondUsage.ts";
import { DiamondUsageStatus } from "@entities/diamond/constants/diamond-usage-status.enum.ts";
import EditDiamondUsageModal from "@features/diamonds/edit-diamond-usage-modal/ui/EditDiamondUsageModal";
import { DiamondUsageMetadata } from "@entities/diamond/models/diamond-usage-metadata.model.ts";
import useDeleteDiamondUsage from "@entities/diamond/hooks/useDeleteDimondUsage.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import EditDiamondUsageQualityIssueModal from "@features/diamonds/edit-diamond-usage-quality-issue-modal/ui/EditDiamondUsageQualityIssueModal";
import EditDiamondUsageBrokenModal from "@features/diamonds/edit-diamond-usage-broken-modal/ui/EditDiamondUsageBrokenModal";

interface Props {
  orderId: number;
  disabled?: boolean;
}

const DiamondUsageTable: FC<Props> = ({ orderId, disabled }) => {
  const [isEditDiamondUsageModalOpen, setIsEditDiamondUsageModalOpen] = useState(false);
  const [isEditDiamondUsageQualityIssueModal, setIsEditDiamondUsageQualityIssueModal] = useState(false);
  const [isEditDiamondUsageBrokenModal, setIsEditDiamondUsageBrokenModal] = useState(false);

  const [diamondRecord, setDiamondRecord] = useState<DiamondUsageMetadata>();

  const { modalApi } = useModal();

  const [searchConfig, setSearchConfig] = useState<SearchDiamondUsageDto>({
    page: 1,
    size: DIAMOND_TABLE_PAGE_SIZE,
    searchCriteria: {
      orderIds: [orderId],
    },
  });
  const { data, isPending } = useDiamondUsage(searchConfig);

  const deleteMutation = useDeleteDiamondUsage();

  const { messageApi } = useMessage();

  const actions = {
    onDelete: (record) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete record ID: ${record.id}?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(record.id, {
            onSuccess: () => {
              void messageApi.success("Record was successfully deleted from the order");
            },
            onError: () => {
              void messageApi.error("Failed to delete record from the order");
            },
          });
        },
        title: "Delete record?",
      });
    },
    onEdit: (record) => {
      if (record.status === DiamondUsageStatus.GOOD_QUALITY) setIsEditDiamondUsageModalOpen(true);
      if (record.status === DiamondUsageStatus.BROKEN) setIsEditDiamondUsageBrokenModal(true);
      if (record.status === DiamondUsageStatus.QUALITY_ISSUE) setIsEditDiamondUsageQualityIssueModal(true);
      setDiamondRecord(record);
    },
  } satisfies DiamondUsageTableActions;

  const columns = getDiamondUsageColumns(actions, disabled);

  const handlePageChange = (config: TablePaginationConfig) => {
    setSearchConfig((prev) => ({
      ...prev,
      page: config.current as number,
    }));
  };

  const getClassName = (status: DiamondUsageStatus) => {
    if (status === DiamondUsageStatus.BROKEN) {
      return "row-broken";
    }
    if (status === DiamondUsageStatus.QUALITY_ISSUE) {
      return "row-quality-issue";
    }
    return "";
  };

  return (
    <>
      <Table
        className="diamonds-usage-table"
        rowClassName={(item) => getClassName(item.status)}
        columns={columns}
        dataSource={data?.content}
        loading={isPending}
        onChange={handlePageChange}
        pagination={{
          current: data?.page,
          pageSize: data?.size,
          total: data?.totalElements,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        rowKey="id"
      />
      <EditDiamondUsageModal
        open={isEditDiamondUsageModalOpen}
        orderDiamondId={diamondRecord?.id}
        onCancel={() => setIsEditDiamondUsageModalOpen(false)}
      />
      <EditDiamondUsageQualityIssueModal
        open={isEditDiamondUsageQualityIssueModal}
        orderDiamondId={diamondRecord?.id}
        onCancel={() => setIsEditDiamondUsageQualityIssueModal(false)}
      />
      <EditDiamondUsageBrokenModal
        open={isEditDiamondUsageBrokenModal}
        orderDiamondId={diamondRecord?.id}
        onCancel={() => setIsEditDiamondUsageBrokenModal(false)}
      />
    </>
  );
};

export default DiamondUsageTable;
