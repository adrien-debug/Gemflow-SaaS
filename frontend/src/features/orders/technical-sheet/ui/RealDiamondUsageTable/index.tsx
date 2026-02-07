import Table from "antd/es/table";
import { getRealDiamondUsageColumns } from "@features/orders/technical-sheet/utils/get-real-diamond-usage-columns.util.tsx";
import { FC } from "react";
import { DIAMOND_TABLE_PAGE_SIZE } from "@features/diamonds/diamond-usage-table/constants/diamond-table.constants.ts";
import useDiamondUsage from "@entities/diamond/hooks/useDiamondUsage.ts";
import { DiamondUsageStatus } from "@entities/diamond/constants/diamond-usage-status.enum.ts";

interface Props {
  orderId: number;
}

const RealDiamondUsageTable: FC<Props> = ({ orderId }) => {
  const { data, isPending } = useDiamondUsage({
    page: 1,
    size: DIAMOND_TABLE_PAGE_SIZE,
    searchCriteria: {
      orderIds: [orderId],
      statuses: [DiamondUsageStatus.GOOD_QUALITY],
    },
  });

  const columns = getRealDiamondUsageColumns();

  return (
    <Table
      className="real-diamonds-usage-table"
      columns={columns}
      dataSource={data?.content}
      loading={isPending}
      pagination={false}
      rowKey="id"
    />
  );
};

export default RealDiamondUsageTable;
