import { ORDER_METAL_TOTALS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { SetOrderMetalWeightOutDto } from "@entities/order/dto/set-order-metal-weight-out.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";

const useSetOrderMetalWeightOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: SetOrderMetalWeightOutDto }) =>
      OrdersApi.setOrderMetalWeightOut(id, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ORDER_METAL_TOTALS_QUERY_KEY] });
    },
  });
};

export default useSetOrderMetalWeightOut;
