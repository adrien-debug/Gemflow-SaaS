import { SearchAlloyPurchasesDto } from "@entities/alloy/dto/search-alloy-purchases.dto.ts";
import useAlloyPurchases from "@entities/alloy/hooks/useAlloyPurchases.ts";
import { getAlloyPurchasesTableColumns } from "@features/alloys/alloy-purchases-table/utils/getAlloyPurchasesTableColumns.tsx";
import { DateFormat } from "@shared/constants/date-format.ts";
import Table, { TablePaginationConfig } from "antd/es/table";
import { Dayjs } from "dayjs";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import EditAlloyPurchaseModal from "@features/alloys/edit-alloy-purchase-modal/ui/EditAlloyPurchaseModal";
import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import useModal from "@shared/hooks/useModal.ts";
import { useDeleteAlloyPurchase } from "@entities/alloy/hooks/useDeleteAlloyPurchase.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  balanceDate?: Dayjs;
}

const AlloyPurchasesTable: FC<Props> = ({ balanceDate }) => {
  const { id } = useParams();
  const { modalApi } = useModal();
  const { messageApi } = useMessage();
  const [selectedPurchase, setSelectedPurchase] = useState<AlloyPurchase>();
  const [editPurchaseModalOpen, setEditPurchaseModalOpen] = useState(false);

  const [paginationConfiguration, setPaginationConfiguration] = useState<SearchAlloyPurchasesDto>({
    page: 1,
    size: 100,
    searchCriteria: {
      alloyIds: [Number(id)],
      balanceDate: balanceDate?.format(DateFormat.YearMonthDay),
    },
  });

  const deleteMutation = useDeleteAlloyPurchase();
  const { data, isPending } = useAlloyPurchases(paginationConfiguration);

  const columns = getAlloyPurchasesTableColumns({
    delete: (purchase: AlloyPurchase) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete purchase with ID ${purchase.id}?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(purchase.id, {
            onSuccess: () => {
              void messageApi.success(`Purchase with ID ${purchase.id} was successfully deleted`);
            },
            onError: (e) => {
              void messageApi.success(e.data?.friendlyMessage);
            },
          });
        },
        title: "Delete purchase?",
      });
    },
    edit: (purchase: AlloyPurchase) => {
      setSelectedPurchase(purchase);
      setEditPurchaseModalOpen(true);
    },
  });

  useEffect(() => {
    setPaginationConfiguration((prev) => ({
      ...prev,
      searchCriteria: {
        ...prev.searchCriteria,
        balanceDate: balanceDate?.format(DateFormat.YearMonthDay),
      },
    }));
  }, [balanceDate]);

  const handleChange = (pagination: TablePaginationConfig) => {
    setPaginationConfiguration((prev) => ({
      ...prev,
      page: pagination?.current as number,
    }));
  };

  return (
    <>
      <Table
        onChange={handleChange}
        rowKey="id"
        dataSource={data?.content || []}
        columns={columns}
        loading={isPending}
        // onRow={(purchase) => ({
        //   onClick: () => {
        //     navigate(`/metals/alloys/${id}/purchases/${purchase.id}`);
        //   },
        //   style: {
        //     cursor: "pointer",
        //   },
        // })}
        pagination={{
          current: data?.page,
          pageSize: data?.size,
          total: data?.totalElements,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
      />

      <EditAlloyPurchaseModal
        open={editPurchaseModalOpen}
        purchase={selectedPurchase!}
        onClose={() => setEditPurchaseModalOpen(false)}
      />
    </>
  );
};

export default AlloyPurchasesTable;
