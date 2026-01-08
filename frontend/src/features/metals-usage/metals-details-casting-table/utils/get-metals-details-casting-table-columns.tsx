import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { getShortString } from "@shared/utils/get-short-string.ts";
import Tag from "@shared/ui/tag/components/Tag";
import { ColumnsType } from "antd/es/table";
import Tooltip from "antd/es/tooltip";
import { InfoCircleOutlined } from "@ant-design/icons";
import Flex from "antd/es/flex";
import { MetalsDetailsCastingTableActions } from "@features/metals-usage/metals-details-casting-table/interfaces/metals-details-casting-table-actions.interface.ts";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
import Image from "@shared/ui/Image";
import { ImageSize } from "@shared/constants/image.ts";
import { MetalCastingMetadata } from "@entities/order/models/metal-casting-metadata.model.ts";

export const getMetalsDetailsCastingTableColumns = (
  actions: MetalsDetailsCastingTableActions,
  disabled?: boolean,
): ColumnsType<MetalCastingMetadata> => {
  return [
    {
      dataIndex: "orderTaskImages",
      title: null,
      width: 76,
      render: (_, { orderTask }) => (
        <Image width={60} height={60} src={orderTask?.orderTaskImages} size={ImageSize.Small} />
      ),
    },
    {
      dataIndex: "createdAt",
      title: "Date",
      render: (_, { createdAt }) => <>{dayjs(createdAt).format(DateFormat.DayMonthYear)}</>,
    },
    {
      dataIndex: "material",
      title: "Material",
      width: 130,
      render: (_, { casting }) => <Tag tag={{ id: null, name: casting?.metal?.name }} />,
    },
    {
      dataIndex: "caratage",
      title: "Caratage",
      render: (_, { casting }) => <Tag tag={{ id: null, name: casting?.metalPurity?.metalPurity }} />,
    },
    {
      dataIndex: "description",
      title: "Description",
      render: (_, { casting }) => <Typography.Text style={{ fontWeight: 600 }}>Casting #{casting?.id}</Typography.Text>,
    },
    {
      dataIndex: "numberOfParts",
      title: "Number of parts",
      render: (_, { orderTask }) => <Typography.Text>{orderTask?.stlCount}</Typography.Text>,
    },
    {
      dataIndex: "weight",
      title: "Weight, g",
      render: (_, { orderTask }) => <Typography.Text>{orderTask?.weight}</Typography.Text>,
    },
    {
      dataIndex: "cost",
      title: (
        <Flex justify="space-between">
          <>Cost</>
          <Tooltip title="Price and cost will be displayed once the corresponding casting is marked as finished">
            <InfoCircleOutlined style={{ width: 10.5, opacity: 0.5 }} />
          </Tooltip>
        </Flex>
      ),
      minWidth: 100,
      render: (_, { cost }) => (
        <Typography.Text style={{ fontWeight: 600, color: brandingColorPalette.brand7, whiteSpace: "nowrap" }}>
          {getShortString(`$${moneyFormatter(cost, 2)}`, 12)}
        </Typography.Text>
      ),
    },
    {
      dataIndex: "actions",
      align: "center",
      render: (_, { casting }) => (
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "CASTING_LIST_ITEM_VIEW",
                label: "View casting details",
                onClick: () => actions.onViewDetails(casting?.id),
              },
            ],
          }}>
          <Button icon={<EllipsisOutlined />} shape="circle" disabled={disabled}></Button>
        </Dropdown>
      ),
    },
  ];
};
