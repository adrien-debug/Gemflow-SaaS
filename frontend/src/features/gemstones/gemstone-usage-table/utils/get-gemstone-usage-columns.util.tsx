import { ColumnsType } from "antd/es/table";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { Gemstone } from "@entities/gemstone/models/gemstone.model.ts";
import { GemstoneUsageTableActions } from "@features/gemstones/gemstone-usage-table/interfaces/gemstone-usage-table-actions.interface.ts";
import Image from "@shared/ui/Image";
import { ImageSize } from "@shared/constants/image.ts";
import { Link } from "react-router";
import { getShortString } from "@shared/utils/get-short-string.ts";

export const getGemstoneUsageColumns = (
  actions: GemstoneUsageTableActions,
  disabled?: boolean,
): ColumnsType<Gemstone> => {
  return [
    {
      dataIndex: "gemstoneImages",
      title: null,
      width: 76,
      render: (_, { gemstoneImages }) => <Image width={60} height={60} src={gemstoneImages} size={ImageSize.Small} />,
    },
    {
      dataIndex: "id",
      title: "ID",
    },
    {
      dataIndex: "name",
      title: "Name",
      minWidth: 200,
      render: (_, { id, name }) => (
        <Link to={`/gemstones/${id}`}>
          <Typography.Text strong>{name}</Typography.Text>
        </Link>
      ),
    },
    {
      dataIndex: "description",
      title: "Description",
      render: (_, { description }) => <Typography.Text>{getShortString(description, 200)}</Typography.Text>,
    },
    {
      dataIndex: "certificate",
      title: "Certificate",
    },
    {
      dataIndex: "totalWeight",
      title: "Weight, ct",
      minWidth: 100,
    },
    {
      dataIndex: "totalCost",
      title: "Price, $",
      minWidth: 100,
      render: (_, { totalCost }) => (
        <Typography.Text style={{ fontWeight: 600, color: brandingColorPalette.brand7, whiteSpace: "nowrap" }}>
          {getShortString(`$${moneyFormatter(totalCost)}`, 12)}
        </Typography.Text>
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
                label: "Unlink",
                onClick: () => actions.onDelete?.(record),
              },
            ],
          }}>
          <Button icon={<EllipsisOutlined />} shape="circle" disabled={disabled}></Button>
        </Dropdown>
      ),
    },
  ];
};
