import useCreateOrder from "@entities/order/hooks/useCreateOrder.ts";
import { CreateOrderSchema } from "@features/orders/create-order/models/create-order.schema.ts";
import OrderForm, { OrderFormRef } from "@features/orders/order-form/ui/OrderForm";
import OrderConverter from "@features/orders/create-order/utils/create-order-converter.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import ActionBar from "@shared/ui/ActionBar";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import Button from "antd/es/button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

export const CreateOrderPage = () => {
  const formRef = useRef<OrderFormRef>(null);
  const navigate = useNavigate();
  const { mutate } = useCreateOrder();
  const [isLoading, setIsLoading] = useState(false);
  const { messageApi } = useMessage();

  const handleFinish = async (values: CreateOrderSchema) => {
    setIsLoading(true);
    const createOrderDto = OrderConverter.convert(values);
    mutate(createOrderDto, {
      onSuccess: (order) => {
        messageApi.success(`Order ${order.name} created successfully.`);
        navigate(`/orders/${order.id}`);
      },
      onError: () => {
        messageApi.error("Something went wrong");
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  const handleSubmit = () => {
    formRef.current?.submit();
  };

  return (
    <CommonLayout>
      <ActionBar title="Create new order">
        <Button onClick={() => navigate("/orders")} size="large">
          Cancel
        </Button>
        <Button loading={isLoading} onClick={handleSubmit} size="large" type="primary">
          Create
        </Button>
      </ActionBar>
      <OrderForm<CreateOrderSchema> ref={formRef} onFinish={handleFinish} />
    </CommonLayout>
  );
};
