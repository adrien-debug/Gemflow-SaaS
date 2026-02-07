import { AlloyedMetalPurchase } from "@entities/alloyed-metal/models/alloyed-metal-purchase.model.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import RemainingWeight from "@shared/ui/RemainingWeight";
import Tag from "@shared/ui/tag/components/Tag";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { ColumnsType } from "antd/es/table";
import Typography from "antd/es/typography";
import dayjs from "dayjs";
import AlloyedMetalPurchaseActions from "@features/alloyed-metals/alloyed-metal-purchases-table/ui/AlloyedMetalPurchaseActions";
import { Link } from "react-router";

export const getAlloyedMetalPurchasesTableColumns = (): ColumnsType<AlloyedMetalPurchase> => [
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
    dataIndex: "castingId",
    title: "Casting",
    width: 170,
    render: (_, { castingId }) =>
      castingId ? (
        <Link to={`/casting/${castingId}`} style={{ padding: 0 }}>
          <Typography.Text strong>{`Casting #${castingId}`}</Typography.Text>
        </Link>
      ) : (
        <Typography.Text strong>-</Typography.Text>
      ),
  },
  {
    dataIndex: "alloyedMetal",
    title: "Metal",
    render: (metal: BaseItem) => <Tag tag={metal} />,
  },
  {
    dataIndex: "alloy",
    title: "Alloy",
    render: (alloy: BaseItem) => <Tag tag={alloy} />,
  },
  {
    dataIndex: "batchWeight",
    title: "Batch weight, g",
    render: (weight) => `${moneyFormatter(weight)}`,
  },
  {
    dataIndex: "batchPrice",
    title: "Batch cost",
    render: (value) => `$${moneyFormatter(value, 2)}`,
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
    dataIndex: "actions",
    title: "Actions",
    align: "center",
    render: (_, purchase) => <AlloyedMetalPurchaseActions purchase={purchase} />,
  },
];
