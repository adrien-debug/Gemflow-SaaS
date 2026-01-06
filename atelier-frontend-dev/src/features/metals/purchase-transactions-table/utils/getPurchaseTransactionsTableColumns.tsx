import { DateFormat } from "@shared/constants/date-format.ts";
import Tag from "@shared/ui/tag/components/Tag";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Button from "antd/es/button";
import { ColumnsType } from "antd/es/table";
import Typography from "antd/es/typography";
import dayjs from "dayjs";

export const getPurchaseTransactionsTableColumns = (): ColumnsType<any> => [
  {
    dataIndex: "date",
    title: "Date",
    width: 130,
    render: (balanceDate) => dayjs(balanceDate).format(DateFormat.DayMonthYear),
  },
  {
    dataIndex: "usageType",
    title: "Usage type",
    width: 170,
    render: (usageType) => <Tag tag={{ id: 1, name: usageType }} />,
  },
  {
    dataIndex: "description",
    title: "Description",
    width: 170,
    render: (description) => (
      <Button type="link" onClick={() => {}} style={{ padding: 0 }}>
        <Typography.Text strong>{description}</Typography.Text>
      </Button>
    ),
  },
  {
    dataIndex: "orderNumber",
    width: 220,
    title: "Order Number",
    render: (orders) => orders.map((order: number) => <Tag tag={{ id: 1, name: order.toString() }} />),
  },
  {
    dataIndex: "weight",
    title: "Weight, g",
    render: (weight) => `$${moneyFormatter(weight)}`,
  },
  {
    dataIndex: "cost",
    title: "Cost",
    render: (cost) => `${moneyFormatter(cost)}`,
  },
  {
    dataIndex: "batchValue",
    title: "Batch value",
    render: (value) => `$${moneyFormatter(value)}`,
  },
];
