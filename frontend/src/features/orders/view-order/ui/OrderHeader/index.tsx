import { RightOutlined } from "@ant-design/icons";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { OrderStatus } from "@entities/order/constants/order-status.enum.ts";
import useDeleteOrder from "@entities/order/hooks/useDeleteOrder.ts";
import { useOrder } from "@entities/order/hooks/useOrder.ts";
import useUpdateOrderStatus from "@entities/order/hooks/useUpdateOrderStatus.ts";
import OrderStatusSelect from "@entities/order/ui/OrderStatusSelect";
import PrintOrderButton from "@features/orders/print-order-button/ui/PrintOrderButton";
import OrderQRCodeButton from "@features/orders/order-qr-code/ui/OrderQRCodeButton";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useModal from "@shared/hooks/useModal.ts";
import ActionBar from "@shared/ui/ActionBar";
import InfoBadge from "@shared/ui/InfoBadge";
import { getShortString } from "@shared/utils/get-short-string.ts";
import Breadcrumb from "antd/es/breadcrumb";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";
import "./styles.scss";
import FinishedProductionModal from "@features/orders/finished-production-modal/ui/FinishedProductionModal";
import { useState } from "react";

const breadcrumbs = [
  {
    title: "Orders",
    href: "/orders",
    separator: "",
  },
];

const OrderHeader = () => {
  const { id } = useParams();
  const { isLoading, data: order } = useOrder(Number(id));
  const { isPending, mutate: updateOrderStatus } = useUpdateOrderStatus();
  const { mutate: deleteOrder } = useDeleteOrder();
  const { messageApi } = useMessage();
  const navigate = useNavigate();
  const { modalApi } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    if (order?.id) {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete the "${order.name}" order?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteOrder(order.id, {
            onSuccess: () => {
              void messageApi.success("Order successfully deleted");
              navigate("/orders");
            },
            onError: (e) => {
              void messageApi.error(e.data?.friendlyMessage);
            },
          });
        },
        title: "Delete order?",
      });
    }
  };

  return (
    <div className="order-header">
      <Breadcrumb
        className="breadcrumb"
        items={[
          ...breadcrumbs,
          {
            title: getShortString(order?.name, 32),
          },
        ]}
        separator={<RightOutlined />}
      />
      <ActionBar
        title={order?.name}
        badge={
          <Flex gap={14} align="center">
            {order?.id && <InfoBadge title={order.id} />}
            <Typography className="in-progress-counter">
              {dayjs().diff(dayjs(order?.createdAt), "d") || 1} day(s) in progress
            </Typography>
          </Flex>
        }>
        <Flex gap={12} justify="space-between">
          {order && (
            <>
              <OrderQRCodeButton orderId={order.id} orderName={order.name} />
              <PrintOrderButton order={order} />

              <OrderStatusSelect
                value={order.status}
                loading={isLoading || isPending}
                disabled={isPending}
                onChange={(status: OrderStatus) => updateOrderStatus({ orderId: order.id, status })}
              />
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "production_finished",
                      label: "Production finished",
                      onClick: () => setIsModalOpen(true),
                    },
                    {
                      type: "divider",
                    },
                    {
                      key: "delete",
                      label: "Delete order",
                      onClick: handleDelete,
                    },
                  ],
                }}
                placement="bottomLeft"
                arrow>
                <Button shape="circle" size="large">
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </>
          )}
        </Flex>
      </ActionBar>
      <FinishedProductionModal open={isModalOpen} setIsModalOpen={setIsModalOpen} orderId={order?.id} />
    </div>
  );
};

export default OrderHeader;
