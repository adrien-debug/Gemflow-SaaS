import Tag from "@shared/ui/tag/components/Tag";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { ColumnsType } from "antd/es/table";
import Flex from "antd/es/flex";
import { getShortString } from "@shared/utils/get-short-string.ts";
import { CastingListItem } from "@entities/casting/models/casting-list-item.model.ts";
import { castingStatusNameMap } from "@entities/casting/constants/casting-status.enum.ts";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { CastingTableActions } from "@features/casting/casting-table/interfaces/casting-table-actions.interface.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";

export const getCastingColumns = (actions: CastingTableActions): ColumnsType<CastingListItem> => {
  return [
    {
      dataIndex: "id",
      title: "ID",
      render: (id) => <Typography.Text style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{id}</Typography.Text>,
    },
    {
      dataIndex: "createdAt",
      title: "Creation date",
      render: (date) => dayjs(date).format(DateFormat.YearMonthDay),
    },
    {
      dataIndex: "cylinder",
      title: "Cylinder",
      render: (_, { cylinder }) => <Tag tag={{ id: null, name: cylinder.name }} />,
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (_, { status }) => <Tag tag={{ id: null, name: castingStatusNameMap[status] }} />,
    },
    {
      dataIndex: "metal",
      title: "Metal",
      render: (_, { metal }) => <Tag tag={{ id: null, name: metal.name }} />,
    },
    {
      dataIndex: "metalPurity",
      title: "Caratage",
      render: (_, { metalPurity }) => <Tag tag={{ id: null, name: metalPurity.metalPurity }} />,
    },
    {
      dataIndex: "pureMetal",
      title: "Pure metal, weight, g",
      width: 130,
      render: (_, { pureMetalWeight, priceMetalName }) => (
        <Flex vertical>
          <Typography.Text style={{ color: brandingColorPalette.brand7 }}>{priceMetalName?.name}</Typography.Text>
          <Typography.Text>{moneyFormatter(pureMetalWeight)}</Typography.Text>
        </Flex>
      ),
    },
    {
      dataIndex: "alloyMetal",
      title: "Alloy, weight, g",
      width: 100,
      render: (_, { alloy, alloyWeight }) =>
        alloy ? (
          <Flex vertical>
            <Typography.Text style={{ color: brandingColorPalette.brand7 }}>{alloy?.name}</Typography.Text>
            <Typography.Text>{moneyFormatter(alloyWeight)}</Typography.Text>
          </Flex>
        ) : (
          <Flex style={{ color: brandingColorPalette.brand7 }}>—</Flex>
        ),
    },
    {
      dataIndex: "alloyedMetal",
      title: "Alloyed metal, weight, g",
      width: 130,
      render: (_, { alloyedMetal, alloyedMetalWeight }) =>
        alloyedMetal ? (
          <Flex vertical>
            <Typography.Text style={{ color: brandingColorPalette.brand7, whiteSpace: "nowrap" }}>
              {getShortString(alloyedMetal?.name, 15)}
            </Typography.Text>
            <Typography.Text>{moneyFormatter(alloyedMetalWeight)}</Typography.Text>
          </Flex>
        ) : (
          <Flex style={{ color: brandingColorPalette.brand7 }}>—</Flex>
        ),
    },
    {
      dataIndex: "orders",
      title: "Orders",
      width: 250,
      render: (_, { orderIds }) => (
        <>{orderIds?.map((id) => <Tag key={id} tag={{ id, name: id }} style={{ marginBottom: 8 }} />)}</>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      align: "center",
      render: (_, casting) => (
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          menu={{
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();
            },
            items: [
              {
                key: "CASTING_DELETE",
                label: "Delete",
                onClick: () => actions.onDelete(casting),
              },
            ],
          }}>
          <Button icon={<EllipsisOutlined />} shape="circle" onClick={(e) => e.stopPropagation()}></Button>
        </Dropdown>
      ),
    },
  ];
};
