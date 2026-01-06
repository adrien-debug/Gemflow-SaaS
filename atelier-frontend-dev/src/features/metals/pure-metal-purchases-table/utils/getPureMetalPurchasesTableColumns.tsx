import { PureMetalPurchasesTableActions } from "@features/metals/pure-metal-purchases-table/model/pure-metal-purchases-table-actions.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import RemainingWeight from "@shared/ui/RemainingWeight";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { ColumnsType } from "antd/es/table";
import Typography from "antd/es/typography";
import dayjs from "dayjs";
import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Dropdown from "antd/es/dropdown";
import { getShortString } from "@shared/utils/get-short-string.ts";

export const getPureMetalPurchasesTableColumns = (
  actions: PureMetalPurchasesTableActions,
): ColumnsType<PureMetalPurchase> => [
  {
    dataIndex: "id",
    title: "ID",
  },
  {
    dataIndex: "balanceDate",
    title: "Balance date",
    width: 130,
    render: (_, { balanceDate }) => dayjs(balanceDate).format(DateFormat.DayMonthYear),
  },
  {
    dataIndex: "supplier",
    title: "Supplier",
    width: 400,
    render: (_, { supplier }) => <Typography.Text strong>{getShortString(supplier.name, 200)}</Typography.Text>,
  },
  {
    dataIndex: "barNumber",
    width: 220,
    title: (
      <>
        Bar number,
        <br />
        Certificate of Conformity
      </>
    ),
    render: (_, { barNumber, coc }) => (
      <>
        <Typography.Text>{barNumber}</Typography.Text>
        <br />
        <Typography.Text type="secondary">{coc}</Typography.Text>
      </>
    ),
  },
  {
    dataIndex: "pricePerGram",
    title: "Price per gram",
    width: 140,
    render: (_, { priceGram }) => `$${moneyFormatter(priceGram)}`,
  },
  {
    dataIndex: "batchWeight",
    title: "Batch weight, g",
    width: 140,
    render: (_, { batchWeight }) => `${moneyFormatter(batchWeight)}`,
  },
  {
    dataIndex: "batchValue",
    title: "Batch value",
    width: 120,
    render: (_, { batchPrice }) => `$${moneyFormatter(batchPrice)}`,
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
    dataIndex: "remainingValue",
    title: "Remaining Value",
    width: 140,
    render: (_, { remainingPrice }) => (
      <Typography.Text strong style={{ color: brandingColorPalette.brand6 }}>
        ${moneyFormatter(remainingPrice, 2)}
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
              key: "PURE_METAL_PURCHASE_EDIT",
              label: "Edit",
              onClick: () => actions.edit(purchase),
            },
            {
              key: "PURE_METAL_PURCHASE_DELETE",
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
