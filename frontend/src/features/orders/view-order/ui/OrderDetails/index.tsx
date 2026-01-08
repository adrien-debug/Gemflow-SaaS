import useUpdateOrder from "@entities/order/hooks/useUpdateOrder.ts";
import { Order } from "@entities/order/models/order.model.ts";
import { EditOrderSchema } from "@features/orders/edit-order/models/edit-order.schema.ts";
import EditOrderConverter from "@features/orders/edit-order/utils/edit-order-converter.ts";
import OrderForm, { OrderFormRef } from "@features/orders/order-form/ui/OrderForm";
import ViewOrder from "@features/orders/view-order/ui/ViewOrder";
import { DateFormat } from "@shared/constants/date-format.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import EditFormController from "@shared/ui/EditFormController";
import { FC, useRef, useState } from "react";
import { useParams } from "react-router";
import Loading from "@shared/ui/Loading";
import dayjs from "dayjs";

interface Props {
  order?: Order;
  isLoading: boolean;
  isEditBlocked?: boolean;
  disabled?: boolean;
}

const OrderDetails: FC<Props> = ({ order, isLoading, isEditBlocked, disabled }) => {
  const { id } = useParams();

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useUpdateOrder(Number(id));
  const { messageApi } = useMessage();
  const formRef = useRef<OrderFormRef>(null);

  const handleFinish = async (values: EditOrderSchema) => {
    setIsUpdating(true);
    const updateOrderDto = EditOrderConverter.convert(values);
    mutate(updateOrderDto, {
      onSuccess: (data: Order) => {
        messageApi.success(`Order ${data.name} updated successfully.`);
      },
      onError: () => {
        messageApi.error("Something went wrong!");
      },
      onSettled: () => {
        setIsEditing(false);
        setIsUpdating(false);
      },
    });
  };

  const handleSave = () => {
    formRef.current?.submit();
  };

  if (isLoading || !order) return <Loading />;
  return (
    <>
      <EditFormController
        editing={isEditing}
        loading={isUpdating || isImageLoading}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={handleSave}
        id="edit-order"
        title="Order details"
        description={`Created on ${dayjs(order?.createdAt).format(DateFormat.LiteralMontDayYear)} by ${order.createdBy?.fullName}`}
        isEditBlocked={isEditBlocked}
        editButtonProps={{
          style: { display: disabled ? "none" : "flex" },
        }}
      />

      {isEditing ? (
        <OrderForm<EditOrderSchema>
          ref={formRef}
          variant="edit"
          order={order}
          onFinish={handleFinish}
          id={order?.id}
          onStartImageLoading={() => setIsImageLoading(true)}
          onFinishImageLoading={() => setIsImageLoading(false)}
        />
      ) : (
        <ViewOrder order={order} />
      )}
    </>
  );
};

export default OrderDetails;
