import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { getShortString } from "@shared/utils/get-short-string.ts";
import { ColumnsType } from "antd/es/table";

export const getSummaryGemsCostTableColumns = (): ColumnsType => {
  return [
    {
      dataIndex: "numberOfGems",
      title: "Number of gems",
      render: (_, { totalQuantity }) => <Typography.Text>{totalQuantity}</Typography.Text>,
    },
    {
      dataIndex: "totalWeight",
      title: "Total weight, ct",
    },
    {
      dataIndex: "totalCost",
      title: "Total cost",
      width: 160,
      render: (_, { totalCost }) => (
        <Typography.Text>{getShortString(`$${moneyFormatter(totalCost, 2)}`, 12)}</Typography.Text>
      ),
    },
  ];
};
