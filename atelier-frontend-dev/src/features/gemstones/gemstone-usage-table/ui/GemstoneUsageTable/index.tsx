import { FC, useState } from "react";
import Table from "antd/es/table";
import useModal from "@shared/hooks/useModal.ts";
import { TablePaginationConfig } from "antd/es/table/InternalTable";
import { SearchGemstoneDto } from "@entities/gemstone/dto/search-gemstone.dto.ts";
import { GEMSTONE_TABLE_PAGE_SIZE } from "@features/gemstones/gemstone-usage-table/constants/gemstone-table.constants.ts";
import useGemstones from "@entities/gemstone/hooks/useGemstones.ts";
import { getGemstoneUsageColumns } from "@features/gemstones/gemstone-usage-table/utils/get-gemstone-usage-columns.util.tsx";
import { GemstoneUsageTableActions } from "@features/gemstones/gemstone-usage-table/interfaces/gemstone-usage-table-actions.interface.ts";
import useDeleteGemstoneFromOrder from "@entities/gemstone/hooks/useDeleteGemstoneFromOrder.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  orderId: number;
  disabled?: boolean;
}

const GemstoneUsageTable: FC<Props> = ({ orderId, disabled }) => {
  const { modalApi } = useModal();
  const { messageApi } = useMessage();
  const [searchConfig, setSearchConfig] = useState<SearchGemstoneDto>({
    page: 1,
    size: GEMSTONE_TABLE_PAGE_SIZE,
    searchCriteria: {
      orderIds: [orderId],
    },
  });

  const { data, isFetching } = useGemstones(searchConfig);
  const deleteMutation = useDeleteGemstoneFromOrder();

  const actions = {
    onDelete: (gemstone) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to unlink gemstone ID: ${gemstone.id}?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(
            { orderId, gemstoneId: gemstone.id },
            {
              onSuccess: () => {
                void messageApi.success("Gemstone was successfully unlinked from the order");
              },
              onError: () => {
                void messageApi.error("Failed to unlink gemstone from the order");
              },
            },
          );
        },
        title: "Unlink gemstone?",
      });
    },
  } satisfies GemstoneUsageTableActions;

  const columns = getGemstoneUsageColumns(actions, disabled);

  const handlePageChange = (config: TablePaginationConfig) => {
    setSearchConfig((prev) => ({
      ...prev,
      page: config.current as number,
    }));
  };

  return (
    <Table
      columns={columns}
      dataSource={data?.content}
      loading={isFetching}
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
  );
};

export default GemstoneUsageTable;
