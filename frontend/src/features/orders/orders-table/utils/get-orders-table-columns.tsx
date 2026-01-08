import "./styles.scss";
import { OrderListItem } from "@entities/order/models/order-list-item.model.ts";
import { OrderListActions } from "@features/orders/orders-table/interfaces/orders-table-actions.interface.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import { ColumnsType } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import { generateOrderStatuses } from "@entities/order/utils/generate-order-statuses.ts";
import Select from "antd/es/select";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import Image from "@shared/ui/Image";
import { MenuProps } from "antd/es/menu";
import { generateOrderPriorities } from "@entities/order/utils/generate-order-priorities.ts";
import Typography from "antd/es/typography";
import { ImageSize } from "@shared/constants/image.ts";
import { Link } from "react-router";
import dayjs from "dayjs";

const items: MenuProps["items"] = [
  {
    key: "ORDER_LIST_ITEM_DELETE",
    label: "Delete",
  },
];

const { Text } = Typography;

export const getOrdersTableColumns = ({
  onRowDelete,
  onPriorityChange,
  onStatusChange,
}: OrderListActions): ColumnsType<OrderListItem> => {
  const orderStatuses = generateOrderStatuses();
  const orderPriorities = generateOrderPriorities();

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
      title: "Order #",
      minWidth: 90,
    },
    {
      dataIndex: "name",
      title: "Name",
      render: (_, { name, id }) => (
        <Link to={`/orders/${id}`}>
          <Text style={{ fontWeight: 600 }}>{name}</Text>
        </Link>
      ),
    },
    {
      dataIndex: "client",
      title: "Client",
      render: ({ name }) => name,
    },
    {
      dataIndex: "status",
      title: "Status",
      filters: orderStatuses.map(({ id, name }) => ({
        text: name,
        value: id,
      })),
      render: (_, order) => (
        <Select
          className="status borderless-select"
          variant="borderless"
          popupMatchSelectWidth={false}
          options={orderStatuses}
          value={order.status}
          fieldNames={{ value: "id", label: "name" }}
          onChange={(status) => onStatusChange?.(order, status)}
        />
      ),
    },
    {
      dataIndex: "createdAt",
      title: "Creation date",
      render: (date) => dayjs(date).format(DateFormat.YearMonthDay),
    },
    {
      dataIndex: "dueDate",
      title: "Due date",
      minWidth: 120,
    },
    {
      dataIndex: "itemCategory",
      title: "Category",
      render: ({ name }) => name,
    },
    {
      dataIndex: "segment",
      title: "Client segment",
      render: ({ name }) => name,
    },
    {
      dataIndex: "priority",
      title: "Priority",
      render: (_, order) => (
        <Select
          className={order.priority}
          variant="borderless"
          popupMatchSelectWidth={false}
          options={orderPriorities}
          value={order.priority}
          fieldNames={{ value: "id", label: "name" }}
          onChange={(priority) => onPriorityChange?.(order, priority)}
        />
      ),
    },
    {
      key: "actions",
      title: "Actions",
      align: "center",
      render: (_, order) => (
        <Dropdown
          menu={{
            items,
            onClick: () => onRowDelete?.(order),
          }}
          placement="bottomRight"
          trigger={["click"]}>
          <Button icon={<EllipsisOutlined />} shape="circle" />
        </Dropdown>
      ),
    },
  ];
};
