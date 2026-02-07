import Table, { TablePaginationConfig } from "antd/es/table";
import { FC, useState } from "react";
import { CastingTableActions } from "@features/casting/casting-table/interfaces/casting-table-actions.interface.ts";
import { getCastingColumns } from "@features/casting/casting-table/utils/get-casting-columns.util.tsx";
import { useNavigate } from "react-router";
import useCastings from "@entities/casting/hooks/useCastings.ts";
import { CastingSearchDto } from "@entities/casting/dto/casting-search.dto.ts";
import useDeleteCasting from "@entities/casting/hooks/useDeleteCasting.ts";
import useModal from "@shared/hooks/useModal.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {}

const CastingTable: FC<Props> = () => {
  const navigate = useNavigate();
  const { modalApi } = useModal();
  const { messageApi } = useMessage();

  const [paginationConfiguration, setPaginationConfiguration] = useState<CastingSearchDto>({
    page: 1,
    size: 10,
    searchCriteria: {},
  });

  const deleteMutation = useDeleteCasting();

  const { data, isLoading } = useCastings(paginationConfiguration);

  const actions = {
    onDelete: (casting) => {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete casting ID: ${casting.id}?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(casting.id, {
            onSuccess: () => {
              void messageApi.success("Casting was successfully deleted");
            },
            onError: () => {
              void messageApi.error("Failed to delete casting");
            },
          });
        },
        title: "Delete casting?",
      });
    },
    onPageChange: (config: TablePaginationConfig) => {
      setPaginationConfiguration((prev) => ({
        ...prev,
        page: config.current as number,
      }));
    },
  } satisfies CastingTableActions;

  const columns = getCastingColumns(actions);

  const onChange = (pagination: TablePaginationConfig) => {
    actions.onPageChange?.(pagination);
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
      onRow={(casting) => ({
        onClick: () => {
          navigate(`/casting/${casting?.id}`);
        },
        style: {
          cursor: "pointer",
        },
      })}
    />
  );
};

export default CastingTable;
