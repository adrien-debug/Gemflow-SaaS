import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { getShortString } from "@shared/utils/get-short-string.ts";
import { ColumnsType } from "antd/es/table";

export const getSummaryDiamondsCostTableColumns = (): ColumnsType => {
  return [
    {
      dataIndex: "totalWeight",
      title: "Total weight, ct",
    },
    {
      dataIndex: "totalWeightGrams",
      title: "Total weight, g",
    },
    {
      dataIndex: "totalPrice",
      title: "Cost",
      width: 160,
      render: (_, { totalPrice }) => (
        <Typography.Text>{getShortString(`$${moneyFormatter(totalPrice)}`, 12)}</Typography.Text>
      ),
    },
  ];
};
