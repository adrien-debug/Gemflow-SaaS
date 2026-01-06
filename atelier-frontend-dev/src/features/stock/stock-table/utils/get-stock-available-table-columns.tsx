import { ColumnsType } from "antd/es/table";
import Image from "@shared/ui/Image";
import { ImageSize } from "@shared/constants/image.ts";
import { Link } from "react-router";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import { EllipsisOutlined } from "@ant-design/icons";
import { StockAvailableTableActions } from "@features/stock/stock-table/interfaces/stock-available-table-actions.interface.ts";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { getShortString } from "@shared/utils/get-short-string.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Tag from "@shared/ui/tag/components/Tag";
import { StockListItem } from "@entities/stock/models/stock-list-item.model.ts";
const { Text } = Typography;

export const getStockAvailableTableColumns = ({
  onMarkAsSold,
  onMarkAsMemoOut,
}: StockAvailableTableActions): ColumnsType<StockListItem> => {
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
      dataIndex: "location",
      title: "Location",
      render: (_, { stock }) => <Tag tag={{ id: null, name: stock?.location?.name }} />,
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
                key: "STOCK_AVAILABLE_ITEM_MARK_AS_SOLD",
                label: "Mark as sold",
                onClick: () => onMarkAsSold?.(order),
              },
              {
                key: "STOCK_AVAILABLE_ITEM_MARK_AS_MEMO_OUT",
                label: "Memo out",
                onClick: () => onMarkAsMemoOut?.(order),
              },
            ],
          }}>
          <Button icon={<EllipsisOutlined />} shape="circle"></Button>
        </Dropdown>
      ),
    },
  ];
};
