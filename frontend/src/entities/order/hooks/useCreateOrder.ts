import OrdersApi from "@entities/order/api/orders.api.ts";
import { CreateOrderDto } from "@entities/order/dto/create-order.dto.ts";
import { CREATE_ORDER_QUERY } from "@entities/order/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createOrderDto: CreateOrderDto) => OrdersApi.create(createOrderDto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CREATE_ORDER_QUERY] });
    },
  });
};

export default useCreateOrder;
