import Table, { TablePaginationConfig } from "antd/es/table";
import { getGemstonesColumns } from "@features/gemstones/gemstone-table/utils/get-gemstones-columns.util";
import { FC } from "react";
import { GemstonesTableActions } from "@features/gemstones/gemstone-table/interfaces/gemstones-table-actions.interface";
import useLocations from "@entities/location/hooks/useLocation";
import { FilterValue } from "antd/es/table/interface";
import useGemstones from "@entities/gemstone/hooks/useGemstones";
import useModal from "@shared/hooks/useModal.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useDeleteGemstone from "@entities/gemstone/hooks/useDeleteGemstone";
import { SearchGemstoneDto } from "@entities/gemstone/dto/search-gemstone.dto";
import { GemstoneStatus } from "@entities/gemstone/constants/gemstone-status.enum";
import useUpdateGemstoneStatus from "@entities/gemstone/hooks/useUpdateGemstoneStatus";
import useUpdateGemstonePaymentStatus from "@entities/gemstone/hooks/useUpdateGemstonePaymentStatus";
import useGemstonePaymentStatuses from "@entities/gemstone/hooks/useGemstonePaymentStatuses";

interface Props {
  paginationConfiguration: SearchGemstoneDto;
  setPaginationConfiguration: (prev: SearchGemstoneDto | ((prev: SearchGemstoneDto) => SearchGemstoneDto)) => void;
}

const GemstonesTable: FC<Props> = ({ paginationConfiguration, setPaginationConfiguration }) => {
  const { data: locations } = useLocations();

  const { data: paymentStatuses } = useGemstonePaymentStatuses();

  const { data, isLoading } = useGemstones(paginationConfiguration);

  const deleteMutation = useDeleteGemstone();

  const { modalApi } = useModal();

  const { messageApi } = useMessage();

  const updateStatus = useUpdateGemstoneStatus();

  const updatePaymentStatus = useUpdateGemstonePaymentStatus();

  const actions = {
    onDeleteGemstone: (gemstone) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete the ${gemstone.name} gemstone record?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(gemstone.id, {
            onSuccess: () => {
              void messageApi.success("Gemstone record successfully deleted");
            },
            onError: () => {
              void messageApi.error("Failed to delete gemstone record");
            },
          });
        },
        title: "Delete gemstone record?",
      });
    },
    onStatusChange: (gemstone, status) => {
      updateStatus.mutate(
        {
          id: gemstone.id,
          status,
        },
        {
          onError: (e) => {
            void messageApi.error(e.data?.friendlyMessage);
          },
        },
      );
    },
    onPageChange: (config: TablePaginationConfig) => {
      setPaginationConfiguration((prev) => ({
        ...prev,
        page: config.current as number,
      }));
    },
    onFilterLocationChange: (locationIds: number[]) => {
      setPaginationConfiguration((prev) => ({
        ...prev,
        searchCriteria: {
          ...prev.searchCriteria,
          locationIds,
        },
      }));
    },
    onFilterStatusChange: (statuses: GemstoneStatus[]) => {
      setPaginationConfiguration((prev) => ({
        ...prev,
        searchCriteria: {
          ...prev.searchCriteria,
          statuses,
        },
      }));
    },
    onPaymentStatusChange: (gemstone, paymentStatusId) => {
      updatePaymentStatus.mutate(
        { id: gemstone.id, paymentStatusId },
        {
          onError: () => {
            void messageApi.error("Failed to update gemstone payment status");
          },
        },
      );
    },
  } satisfies GemstonesTableActions;

  const columns = getGemstonesColumns(actions, locations, paymentStatuses);

  const onChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>) => {
    actions.onPageChange?.(pagination);
    actions.onFilterLocationChange?.(filters.location as number[]);
    actions.onFilterStatusChange?.(filters.status as GemstoneStatus[]);
  };

  return (
    <Table
      columns={columns}
      dataSource={data?.content}
      loading={isLoading}
      onChange={onChange}
      pagination={{
        current: data?.page,
        pageSize: data?.size,
        total: data?.totalElements,
        hideOnSinglePage: true,
        showSizeChanger: false,
      }}
      rowKey="id"
    />
  );
};

export default GemstonesTable;
