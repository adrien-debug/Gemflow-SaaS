import { SearchOtherMaterialTransactionsDto } from "@entities/other-material/dto/search-other-material-transactions.dto.ts";
import useOtherMaterialTransactions from "@entities/other-material/hooks/useOtherMaterialTransactions.ts";
import { getOtherMaterialTransactionsTableColumns } from "@features/other-materials/other-material-transactions-table/utils/get-other-material-transactions-table-columns.util.tsx";
import { DateFormat } from "@shared/constants/date-format.ts";
import { Table } from "antd";
import { TablePaginationConfig } from "antd/es/table";
import { Dayjs } from "dayjs";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";

interface Props {
  balanceDate?: Dayjs;
}

const OtherMaterialTransactionsTable: FC<Props> = ({ balanceDate }) => {
  const { id } = useParams();
  const columns = getOtherMaterialTransactionsTableColumns();
  const [paginationConfiguration, setPaginationConfiguration] = useState<SearchOtherMaterialTransactionsDto>({
    page: 1,
    size: 100,
    searchCriteria: {
      otherMaterialIds: [Number(id)],
      balanceDate: balanceDate?.format(DateFormat.YearMonthDay),
    },
  });

  const { data, isPending } = useOtherMaterialTransactions(paginationConfiguration);

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

export default OtherMaterialTransactionsTable;
