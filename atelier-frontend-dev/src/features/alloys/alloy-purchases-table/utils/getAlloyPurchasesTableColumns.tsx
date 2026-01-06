import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import RemainingWeight from "@shared/ui/RemainingWeight";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { ColumnsType } from "antd/es/table";
import Typography from "antd/es/typography";
import dayjs from "dayjs";
import { getShortString } from "@shared/utils/get-short-string.ts";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { AlloyPurchasesTableActions } from "@features/alloys/alloy-purchases-table/model/alloy-purchases-table-actions.ts";

export const getAlloyPurchasesTableColumns = (actions: AlloyPurchasesTableActions): ColumnsType<AlloyPurchase> => [
  {
    dataIndex: "id",
    title: "ID",
  },
  {
    dataIndex: "balanceDate",
    title: "Balance date",
    width: 130,
    render: (balanceDate) => dayjs(balanceDate).format(DateFormat.DayMonthYear),
  },
  {
    dataIndex: "supplier",
    title: "Supplier",
    width: 170,
    render: ({ name }) => <Typography.Text strong>{getShortString(name, 200)}</Typography.Text>,
  },
  {
    dataIndex: "priceGram",
    title: "Price per gram",
    render: (price) => `$${moneyFormatter(price)}`,
  },
  {
    dataIndex: "batchWeight",
    title: "Batch weight, g",
    render: (weight) => `${moneyFormatter(weight)}`,
  },
  {
    dataIndex: "batchPrice",
    title: "Batch value",
    render: (value) => `$${moneyFormatter(value)}`,
  },
  {
    dataIndex: "remainingWeight",
    title: "Remaining weight, g",
    width: 170,
    render: (_, { remainingWeight, batchWeight }) => (
      <RemainingWeight remainingWeight={remainingWeight} totalWeight={batchWeight} />
    ),
  },
  {
    dataIndex: "remainingPrice",
    title: "Remaining Value",
    render: (remainingValue) => (
      <Typography.Text strong style={{ color: brandingColorPalette.brand6 }}>
        ${moneyFormatter(remainingValue, 2)}
      </Typography.Text>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    align: "center",
    render: (_, purchase) => (
      <Dropdown
        placement="bottomRight"
        trigger={["click"]}
        menu={{
          onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
          },
          items: [
            {
              key: "ALLOY_PURCHASE_EDIT",
              label: "Edit",
              onClick: () => actions.edit(purchase),
            },
            {
              key: "ALLOY_PURCHASE_DELETE",
              label: "Delete",
              onClick: () => actions.delete(purchase),
            },
          ],
        }}>
        <Button icon={<EllipsisOutlined />} shape="circle" onClick={(e) => e.stopPropagation()}></Button>
      </Dropdown>
    ),
  },
];
