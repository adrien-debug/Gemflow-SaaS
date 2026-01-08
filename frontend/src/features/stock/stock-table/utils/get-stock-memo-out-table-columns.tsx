import { ColumnsType } from "antd/es/table";
import Image from "@shared/ui/Image";
import { ImageSize } from "@shared/constants/image.ts";
import { Link } from "react-router";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import { EllipsisOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { getShortString } from "@shared/utils/get-short-string.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Tag from "@shared/ui/tag/components/Tag";
import { StockMemoOutTableActions } from "@features/stock/stock-table/interfaces/stock-memo-out-table-actions.interface.ts";
import { StockListItem } from "@entities/stock/models/stock-list-item.model.ts";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
const { Text } = Typography;

export const getStockMemoOutTableColumns = ({
  onStockItemReturn,
}: StockMemoOutTableActions): ColumnsType<StockListItem> => {
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
      render: ({ name }) => <Tag tag={{ id: null, name }} />,
    },
    {
      dataIndex: "collection",
      title: "Collection",
      render: (_, { collection }) => <Tag tag={{ id: null, name: collection?.name }} />,
    },
    {
      dataIndex: "issuedTo",
      title: "Issued to",
      width: 200,
      render: (_, { stock }) => <Text>{getShortString(stock?.issueClient?.name, 100)}</Text>,
    },
    {
      dataIndex: "issueDate",
      title: "Issue date",
      width: 150,
      render: (_, { stock }) => (
        <Text style={{ fontWeight: 600 }}>{dayjs(stock?.issueDate).format(DateFormat.DayMonthYear)}</Text>
      ),
    },
    {
      dataIndex: "price",
      title: "Price",
      render: (_, { stock }) => (
        <Typography.Text style={{ fontWeight: 600, color: brandingColorPalette.brand7, whiteSpace: "nowrap" }}>
          {getShortString(`$${moneyFormatter(stock?.totalCost)}`, 12)}
        </Typography.Text>
      ),
    },
    {
      dataIndex: "actions",
      title: "Actions",
      align: "center",
      width: 116,
      render: (_, order) => (
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "STOCK_MEMO_OUT_ITEM_RETURN",
                label: "Returned",
                onClick: () => onStockItemReturn?.(order),
              },
            ],
          }}>
          <Button icon={<EllipsisOutlined />} shape="circle"></Button>
        </Dropdown>
      ),
    },
  ];
};
