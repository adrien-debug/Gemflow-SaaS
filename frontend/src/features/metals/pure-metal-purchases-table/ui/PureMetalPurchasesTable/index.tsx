import { getPureMetalPurchasesTableColumns } from "@features/metals/pure-metal-purchases-table/utils/getPureMetalPurchasesTableColumns.tsx";
import usePureMetalPurchases from "@entities/metal/hooks/usePureMetalPurchases.ts";
import Table, { TablePaginationConfig } from "antd/es/table";
import { FC, useEffect, useState } from "react";
import { SearchPureMetalPurchasesDto } from "@entities/metal/dto/search-pure-metal-purchases.dto.ts";
import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";
import EditMetalPurchaseModal from "@features/metals/edit-metal-purchase-modal/ui/EditMetalPurchaseModal";
import { Dayjs } from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
import useDeletePureMetalPurchase from "@entities/metal/hooks/useDeletePureMetalPurchase.ts";
import useModal from "@shared/hooks/useModal.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  pureMetalId: number;
  filterDate?: Dayjs;
}

const MetalPurchasesTable: FC<Props> = ({ pureMetalId, filterDate }) => {
  const [selectedPurchase, setSelectedPurchase] = useState<PureMetalPurchase>();
  const [editPurchaseModalOpen, setEditPurchaseModalOpen] = useState(false);
  const [paginationConfiguration, setPaginationConfiguration] = useState<SearchPureMetalPurchasesDto>({
    page: 1,
    size: 100,
    searchCriteria: {
      metalPriceNameIds: [pureMetalId],
      balanceDate: filterDate?.format(DateFormat.YearMonthDay),
    },
  });
  const { modalApi } = useModal();
  const { messageApi } = useMessage();
  const { data, isFetching } = usePureMetalPurchases(paginationConfiguration);
  const deleteMutation = useDeletePureMetalPurchase();

  useEffect(() => {
    setPaginationConfiguration((prev) => ({
      ...prev,
      searchCriteria: {
        ...prev.searchCriteria,
        balanceDate: filterDate?.format(DateFormat.YearMonthDay),
      },
    }));
  }, [filterDate]);

  const columns = getPureMetalPurchasesTableColumns({
    delete: (purchase: PureMetalPurchase) => {
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
              void messageApi.error(e.data?.friendlyMessage);
            },
          });
        },
        title: "Delete purchase?",
      });
    },
    edit: (purchase: PureMetalPurchase) => {
      setSelectedPurchase(purchase);
      setEditPurchaseModalOpen(true);
    },
  });

  const handleChange = (pagination: TablePaginationConfig) => {
    setPaginationConfiguration((prev) => ({
      ...prev,
      page: pagination?.current as number,
    }));
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data?.content}
        rowKey="id"
        onChange={handleChange}
        loading={isFetching}
        pagination={{
          current: data?.page,
          pageSize: data?.size,
          total: data?.totalElements,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        // onRow={(purchase) => ({
        //   onClick: () => {
        //     navigate(`/metals/pure-metals/${pureMetalId}/purchases/${purchase.id}`);
        //   },
        //   style: {
        //     cursor: "pointer",
        //   },
        // })}
      />

      <EditMetalPurchaseModal
        open={editPurchaseModalOpen}
        purchase={selectedPurchase!}
        onClose={() => setEditPurchaseModalOpen(false)}
      />
    </>
  );
};

export default MetalPurchasesTable;
