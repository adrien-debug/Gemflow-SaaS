import { ColumnsType } from "antd/es/table";
import Image from "@shared/ui/Image";
import { ImageSize } from "@shared/constants/image.ts";
import { Link } from "react-router";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { getShortString } from "@shared/utils/get-short-string.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Tag from "@shared/ui/tag/components/Tag";
import { StockListItem } from "@entities/stock/models/stock-list-item.model.ts";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
const { Text } = Typography;

export const getStockSoldTableColumns = (): ColumnsType<StockListItem> => {
  return [
    {
      dataIndex: "productImages",
      title: null,
      minWidth: 76,
      width: 76,
      render: (_, { productImages }) => <Image width={60} height={60} src={productImages} size={ImageSize.Small} />,
    },
    {
      dataIndex: "id",
      title: "Order ID",
      width: 200,
    },
    {
      dataIndex: "name",
      title: "Order name",
      minWidth: 360,
      render: (_, { name, id }) => (
        <Link to={`/stock/${id}`}>
          <Text style={{ fontWeight: 600 }}>{name}</Text>
        </Link>
      ),
    },
    {
      dataIndex: "itemCategory",
      title: "Category",
      width: 200,
      render: ({ name }) => <Tag tag={{ id: null, name }} />,
    },
    {
      dataIndex: "collection",
      title: "Collection",
      render: (_, { collection }) => <Tag tag={{ id: null, name: collection?.name }} />,
    },
    {
      dataIndex: "client",
      title: "Client",
      render: (_, { client }) => <Tag tag={{ id: null, name: client?.name }} />,
    },
    {
      dataIndex: "saleDate",
      title: "Sale date",
      width: 150,
      render: (_, { stock }) => (
        <Text style={{ fontWeight: 600 }}>{dayjs(stock?.saleDate).format(DateFormat.DayMonthYear)}</Text>
      ),
    },
    {
      dataIndex: "price",
      title: "Price",
      width: 150,
      render: (_, { stock }) => (
        <Typography.Text style={{ fontWeight: 600, color: brandingColorPalette.brand7, whiteSpace: "nowrap" }}>
          {getShortString(`$${moneyFormatter(stock?.totalCost)}`, 12)}
        </Typography.Text>
      ),
    },
  ];
};
