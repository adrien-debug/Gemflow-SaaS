import OrdersApi from "@entities/order/api/orders.api.ts";
import { CreateOrderLabourDto } from "@entities/order/dto/create-order-labour.dto.ts";
import { ORDER_LABOURS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateOrderLabour = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createOrderLabourDto: CreateOrderLabourDto) => OrdersApi.createLabour(createOrderLabourDto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ORDER_LABOURS_QUERY_KEY] });
    },
  });
};

export default useCreateOrderLabour;
