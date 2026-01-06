import { SearchAlloyedMetalPurchasesDto } from "@entities/alloyed-metal/dto/search-alloyed-metal-purchases.dto.ts";
import useAlloyedMetalPurchases from "@entities/alloyed-metal/hooks/useAlloyedMetalPurchases.ts";
import { getAlloyedMetalPurchasesTableColumns } from "@features/alloyed-metals/alloyed-metal-purchases-table/utils/getAlloyedMetalPurchasesTableColumns.tsx";
import { DateFormat } from "@shared/constants/date-format.ts";
import Table, { TablePaginationConfig } from "antd/es/table";
import { Dayjs } from "dayjs";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";

interface Props {
  balanceDate?: Dayjs;
}

const AlloyedMetalPurchasesTable: FC<Props> = ({ balanceDate }) => {
  const { id } = useParams();
  const columns = getAlloyedMetalPurchasesTableColumns();
  const [paginationConfiguration, setPaginationConfiguration] = useState<SearchAlloyedMetalPurchasesDto>({
    page: 1,
    size: 100,
    searchCriteria: {
      alloyedMetalIds: [Number(id)],
      balanceDate: balanceDate?.format(DateFormat.YearMonthDay),
    },
  });

  const { data, isPending } = useAlloyedMetalPurchases(paginationConfiguration);

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
    <Table
      onChange={handleChange}
      rowKey="id"
      dataSource={data?.content || []}
      columns={columns}
      loading={isPending}
      pagination={{
        current: data?.page,
        pageSize: data?.size,
        total: data?.totalElements,
        hideOnSinglePage: true,
        showSizeChanger: false,
      }}
    />
  );
};

export default AlloyedMetalPurchasesTable;
