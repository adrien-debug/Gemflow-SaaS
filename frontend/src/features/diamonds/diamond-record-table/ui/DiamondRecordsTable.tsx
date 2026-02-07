import Table from "antd/es/table";
import { getDiamondRecordColumns } from "@features/diamonds/diamond-record-table/utils/get-diamond-record-columns.util.tsx";
import useDiamondRecords from "@entities/diamond/hooks/useDiamondRecords.ts";
import { DiamondRecordsTableActions } from "@features/diamonds/diamond-record-table/interfaces/diamond-records-table-actions.interface.ts";
import { FC, useEffect, useState } from "react";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import EditDiamondRecordModal from "@features/diamonds/edit-diamond-record-modal/ui/EditDiamondRecordModal";
import { DIAMOND_TABLE_PAGE_SIZE } from "@features/diamonds/diamond-record-table/constants/diamond-table.constants.ts";
import AddDiamondQuantityModal from "@features/diamonds/add-diamond-quantity-modal/ui/AddDiamondQuantityModal";
import DeductDiamondQuantityModal from "@features/diamonds/deduct-diamond-quantity-modal/ui/DeductDiamondQuantityModal";
import { SearchDiamondRecordDto } from "@entities/diamond/dto/search-diamond-record.dto.ts";
import { TablePaginationConfig } from "antd/es/table/InternalTable";
import useDeleteDiamondRecord from "@entities/diamond/hooks/useDeleteDiamondRecord.ts";
import useModal from "@shared/hooks/useModal.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { Optional } from "@shared/types/optional.type.ts";

interface Props {
  shapeIds?: Optional<number[]>;
}

const DiamondRecordsTable: FC<Props> = ({ shapeIds }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addDiamondQuantityModalOpen, setAddDiamondQuantityModalOpen] = useState(false);
  const [deductDiamondQuantityModalOpen, setDeductDiamondQuantityModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DiamondRecord>();
  const [searchConfig, setSearchConfig] = useState<SearchDiamondRecordDto>({
    page: 1,
    size: DIAMOND_TABLE_PAGE_SIZE,
    searchCriteria: {
      diamondShapeIds: shapeIds,
    },
  });
  const { data, isPending } = useDiamondRecords(searchConfig);
  const deleteMutation = useDeleteDiamondRecord();
  const { modalApi } = useModal();
  const { messageApi } = useMessage();

  useEffect(() => {
    setSearchConfig((prev) => ({
      ...prev,
      searchCriteria: {
        ...prev.searchCriteria,
        diamondShapeIds: shapeIds,
      },
    }));
  }, [shapeIds]);

  const actions = {
    onDeductDiamondsFromRecord: (record) => {
      setEditingRecord(record);
      setDeductDiamondQuantityModalOpen(true);
    },
    onDeleteDiamondRecord: (record) => {
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
              void messageApi.success("Diamond record successfully deleted");
            },
            onError: () => {
              void messageApi.error("Failed to delete diamond record");
            },
          });
        },
        title: "Delete diamond record?",
      });
    },
    onEditDiamondRecord: (record) => {
      setEditingRecord(record);
      setEditModalOpen(true);
    },
    onAddDiamondsToRecord: (record) => {
      setEditingRecord(record);
      setAddDiamondQuantityModalOpen(true);
    },
  } satisfies DiamondRecordsTableActions;

  const columns = getDiamondRecordColumns(actions);

  const handlePageChange = (config: TablePaginationConfig) => {
    setSearchConfig((prev) => ({
      ...prev,
      page: config.current as number,
    }));
  };

  return (
    <>
      <Table
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

      <EditDiamondRecordModal record={editingRecord!} open={editModalOpen} onClose={() => setEditModalOpen(false)} />

      <AddDiamondQuantityModal
        open={addDiamondQuantityModalOpen}
        record={editingRecord!}
        onClose={() => setAddDiamondQuantityModalOpen(false)}
      />

      <DeductDiamondQuantityModal
        open={deductDiamondQuantityModalOpen}
        record={editingRecord!}
        onClose={() => setDeductDiamondQuantityModalOpen(false)}
      />
    </>
  );
};

export default DiamondRecordsTable;
