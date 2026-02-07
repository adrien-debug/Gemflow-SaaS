import Typography from "antd/es/typography";
import { ColumnsType } from "antd/es/table";
import { moneyFormatter } from "@shared/utils/formatter.ts";

export const getSummaryMetalsCostTableColumns = (): ColumnsType => {
  return [
    {
      dataIndex: "material",
      title: "Material",
      render: (_, { metal, metalPurity }) => (
        <Typography.Text>{`${metal?.name} (${metalPurity?.metalPurity})`}</Typography.Text>
      ),
    },
    {
      dataIndex: "weightIn",
      title: "Weight, g",
    },
    {
      dataIndex: "totalCost",
      title: "Cost",
      width: 160,
      render: (_, { totalCost }) => <Typography.Text>{`$${moneyFormatter(totalCost, 2)}`}</Typography.Text>,
    },
  ];
};
