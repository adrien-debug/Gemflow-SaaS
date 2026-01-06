import { OtherMaterialTransaction } from "@entities/other-material/model/other-material-transaction.model.ts";
import OtherMaterialTransactionActions from "@features/other-materials/other-material-transactions-table/ui/OtherMaterialTransactionActions";
import { ColumnsType } from "antd/es/table";
import Typography from "antd/es/typography";
import { getShortString } from "@shared/utils/get-short-string.ts";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";

export const getOtherMaterialTransactionsTableColumns = (): ColumnsType<OtherMaterialTransaction> => [
  {
    dataIndex: "id",
    title: "ID",
    width: 120,
  },
  {
    dataIndex: "balanceDate",
    title: "Balance date",
    width: 200,
    render: (_, { balanceDate }) => (
      <Typography.Text>{dayjs(balanceDate).format(DateFormat.DayMonthYear)}</Typography.Text>
    ),
  },
  {
    dataIndex: "description",
    title: "Description",
    width: 400,
    render: (_, { description }) => <Typography.Text>{getShortString(description, 200)}</Typography.Text>,
  },
  {
    dataIndex: "batchWeight",
    title: "Batch weight, g",
    render: (_, { batchWeight }) => <Typography.Text style={{ fontWeight: 600 }}>{batchWeight}</Typography.Text>,
  },
  {
    dataIndex: "actions",
    title: "Actions",
    width: 100,
    align: "center",
    render: (_, transaction) => <OtherMaterialTransactionActions transaction={transaction} />,
  },
];
