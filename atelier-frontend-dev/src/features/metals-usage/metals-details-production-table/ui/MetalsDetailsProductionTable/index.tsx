import { FC } from "react";
import Table from "antd/es/table";
import Typography from "antd/es/typography";
import { getProductionItemTableColumns } from "@features/metals-usage/metals-details-production-table/utils/get-production-item-table-column.tsx";
import { getProductionTableColumns } from "@features/metals-usage/metals-details-production-table/utils/get-production-table-columns.tsx";
import useMetalsUsageProduction from "@entities/metals-usage/hooks/useMetalsUsageProduction.ts";

interface Props {
  orderId: number;
}

const MetalsDetailsProductionTable: FC<Props> = ({ orderId }) => {
  const { data, isPending } = useMetalsUsageProduction(orderId);

  const mainColumns = getProductionTableColumns();

  const itemColumns = getProductionItemTableColumns();

  return (
    <>
      <Typography.Title level={4} style={{ opacity: 0.5, fontWeight: 400 }}>
        Production
      </Typography.Title>
      <Table
        columns={mainColumns}
        dataSource={data}
        loading={isPending}
        pagination={false}
        rowKey={(item) => `${data?.indexOf(item)}`}
        expandable={{
          expandedRowRender: (production) => (
            <Table
              loading={isPending}
              columns={itemColumns}
              dataSource={production.otherMetalProductions}
              rowKey={(item) => `${item?.id}`}
              pagination={false}
              size="small"
            />
          ),
        }}
      />
    </>
  );
};

export default MetalsDetailsProductionTable;
