import { FC, useEffect, useState } from "react";
import Table, { TablePaginationConfig } from "antd/es/table";
import { ColumnsType } from "antd/es/table";
import useStockItems from "@entities/stock/hooks/useStockItems.ts";
import { StockListItem } from "@entities/stock/models/stock-list-item.model.ts";
import { StockItemStatus } from "@entities/stock/constants/stock-item-status.enum.ts";
import { SearchStockItemsDto } from "@entities/stock/dto/search-stock-items.dto.ts";

const PAGE_SIZE = 100;

interface Props {
  searchInput: string;
  stockStatuses?: StockItemStatus[];
  columns: ColumnsType<StockListItem>;
}

const StockTable: FC<Props> = ({ searchInput, columns, stockStatuses }) => {
  const [searchConfig, setSearchConfig] = useState<SearchStockItemsDto>({
    page: 1,
    size: PAGE_SIZE,
    searchCriteria: { searchInput, statuses: stockStatuses },
  });

  useEffect(() => {
    setSearchConfig((prev) => ({
      ...prev,
      page: 1,
      searchCriteria: { ...prev.searchCriteria, searchInput, statuses: stockStatuses },
    }));
  }, [searchInput, stockStatuses]);

  const { data, isFetching } = useStockItems(searchConfig);

  const onChange = (pagination: TablePaginationConfig) => {
    setSearchConfig((prev) => ({
      ...prev,
      page: pagination.current as number,
    }));
  };

  return (
    <>
      <Table
        columns={columns}
        onChange={onChange}
        loading={isFetching}
        pagination={{
          current: data?.page,
          pageSize: data?.size,
          total: data?.totalElements,
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        dataSource={data?.content || []}
        rowKey="id"
      />
    </>
  );
};

export default StockTable;
