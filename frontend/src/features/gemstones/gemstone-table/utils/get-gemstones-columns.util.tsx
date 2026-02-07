import Select from "antd/es/select";
import { ColumnsType } from "antd/es/table";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Tag from "@shared/ui/tag/components/Tag";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { GemstonesTableActions } from "@features/gemstones/gemstone-table/interfaces/gemstones-table-actions.interface";
import { Gemstone } from "@entities/gemstone/models/gemstone.model";
import Image from "@shared/ui/Image";
import { ImageSize } from "@shared/constants/image.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { BaseItem } from "@shared/types/base-item.type";
import { generateGemstoneStatuses } from "@entities/gemstone/utils/generate-gemstone-statuses.util";
import { Link } from "react-router";
import { getShortString } from "@shared/utils/get-short-string";

export const getGemstonesColumns = (
  actions: GemstonesTableActions,
  locations?: BaseItem[],
  paymentStatuses?: BaseItem[],
): ColumnsType<Gemstone> => {
  const gemstoneStatuses = generateGemstoneStatuses();

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
      width: 150,
      minWidth: 120,
      render: (_, { id, name }) => (
        <Link to={`/gemstones/${id}`}>
          <Typography.Text style={{ fontWeight: 600 }}>{name}</Typography.Text>
        </Link>
      ),
    },
    {
      dataIndex: "description",
      title: "Description",
      minWidth: 200,
      render: (_, { description }) => <Typography.Text>{getShortString(description, 200)}</Typography.Text>,
    },
    {
      dataIndex: "order",
      title: "Order",
      width: 150,
      minWidth: 80,
      render: (_, { order }) => <Typography.Text>{order ? getShortString(order.name, 30) : "-"}</Typography.Text>,
    },
    {
      dataIndex: "totalWeight",
      title: "Carats",
    },
    {
      dataIndex: "supplier",
      title: "Owner",
      width: 100,
      minWidth: 90,
      render: (_, { supplier }) => <Typography.Text>{getShortString(supplier?.name, 30)}</Typography.Text>,
    },
    {
      dataIndex: "totalPrice",
      title: "Total Price",
      render: (_, { totalCost }) => (
        <Typography.Text style={{ fontWeight: 600, color: brandingColorPalette.brand7, whiteSpace: "nowrap" }}>
          {getShortString(`$${moneyFormatter(totalCost)}`, 12)}
        </Typography.Text>
      ),
    },
    {
      dataIndex: "status",
      title: "Status",
      filters: gemstoneStatuses.map(({ id, name }) => ({
        text: name,
        value: id,
      })),
      render: (_, gemstone) => (
        <Select
          style={{
            color: brandingColorPalette.brand6,
          }}
          className="borderless-select"
          variant="borderless"
          popupMatchSelectWidth={false}
          options={gemstoneStatuses}
          disabled={!!gemstone?.order}
          value={gemstone.status}
          fieldNames={{ value: "id", label: "name" }}
          onChange={(status) => actions.onStatusChange?.(gemstone, status)}
        />
      ),
    },
    {
      dataIndex: "location",
      title: "Location",
      filters: locations?.map(({ id, name }) => ({
        text: name,
        value: id?.toString() || "",
      })),
      render: (_, { location }) => <Tag tag={{ id: null, name: getShortString(location.name, 11) }} />,
    },
    {
      dataIndex: "paymentStatus",
      title: "Payment status",
      render: (_, gemstone) => (
        <Select
          style={{ color: brandingColorPalette.brand6 }}
          className="borderless-select"
          variant="borderless"
          popupMatchSelectWidth={false}
          options={paymentStatuses}
          value={gemstone.paymentStatus?.id}
          fieldNames={{ value: "id", label: "name" }}
          onChange={(paymentStatusId) => actions.onPaymentStatusChange?.(gemstone, Number(paymentStatusId))}
          placeholder="—"
        />
      ),
    },
    {
      dataIndex: "actions",
      title: "Actions",
      align: "center",
      render: (_, gemstone) => (
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "GEMSTONE_LIST_ITEM_DELETE",
                label: "Delete",
                onClick: () => actions.onDeleteGemstone(gemstone),
              },
            ],
          }}>
          <Button icon={<EllipsisOutlined />} shape="circle"></Button>
        </Dropdown>
      ),
    },
  ];
};
