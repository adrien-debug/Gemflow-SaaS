import { DiamondUsageTableActions } from "@features/diamonds/diamond-usage-table/interfaces/diamond-usage-table-actions.interface.ts";
import { ColumnsType } from "antd/es/table";
import Tag from "@shared/ui/tag/components/Tag";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { DiamondUsageMetadata } from "@entities/diamond/models/diamond-usage-metadata.model.ts";
import UserTableCell from "@shared/ui/table/UserTableCell";
import { User } from "@entities/user/models/user.model.ts";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
import Flex from "antd/es/flex";

export const getDiamondUsageColumns = (
  actions: DiamondUsageTableActions,
  disabled?: boolean,
): ColumnsType<DiamondUsageMetadata> => {
  return [
    {
      dataIndex: "id",
      title: "ID",
    },
    {
      dataIndex: "supplier",
      title: "Supplier",
      render: (_, { diamond }) => diamond.supplier?.name,
    },
    {
      dataIndex: "diamondShape",
      title: "Shape",
      render: (_, { diamond }) => <Tag tag={{ id: null, name: diamond.diamondShape?.name }} />,
    },
    {
      dataIndex: "sizeName",
      title: "Size",
      render: (_, { diamond }) => <Tag tag={{ id: null, name: diamond.sizeName }} />,
    },
    {
      dataIndex: "qualityType",
      title: "Quality",
      render: (_, { diamond }) => <Tag tag={{ id: null, name: diamond.qualityType }} />,
    },
    {
      dataIndex: "quantity",
      title: "Quantity",
    },
    {
      dataIndex: "stonePrice",
      title: "Price",
      render: (_, { diamond }) => `$${moneyFormatter(diamond.stonePrice)}`,
    },
    {
      dataIndex: "stoneCarat",
      title: "Stone weight, ct",
      render: (_, { diamond }) => diamond.stoneCarat,
    },
    {
      dataIndex: "totalWeight",
      title: "Total weight, ct",
      render: (_, { totalWeight }) => (
        <Typography.Text style={{ color: brandingColorPalette.brand7 }}>{totalWeight}</Typography.Text>
      ),
    },
    {
      dataIndex: "totalPrice",
      title: (
        <Flex vertical>
          <Typography.Text>Total cost,</Typography.Text>
          <Typography.Text>Cost w. markup</Typography.Text>
        </Flex>
      ),
      minWidth: 110,
      render: (_, { totalPrice, totalMarkupPrice }) => (
        <Flex vertical>
          <Typography.Text
            style={{
              color: brandingColorPalette.brand7,
            }}>
            {`$${moneyFormatter(totalPrice, 2)}`}
          </Typography.Text>

          <Typography.Text
            style={{
              fontWeight: 600,
              color: brandingColorPalette.brand7,
            }}>
            {`$${moneyFormatter(totalMarkupPrice)}`}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      dataIndex: "supplier",
      title: "Stone setter, date",
      width: 200,
      render: (_, { employee, date }) =>
        employee ? (
          <UserTableCell user={employee as User} description={dayjs(date).format(DateFormat.LiteralMontDayYear)} />
        ) : (
          "—"
        ),
    },
    {
      dataIndex: "actions",
      align: "center",
      render: (_, record) => (
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "DIAMOND_RECORD_LIST_ITEM_DELETE",
                label: "Delete",
                onClick: () => actions.onDelete?.(record),
              },
              {
                key: "DIAMOND_RECORD_LIST_ITEM_EDIT",
                label: "Edit",
                onClick: () => actions.onEdit?.(record),
              },
            ],
          }}>
          <Button icon={<EllipsisOutlined />} shape="circle" disabled={disabled}></Button>
        </Dropdown>
      ),
    },
  ];
};
