import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { UpdateOrderLabourDto } from "@entities/order/dto/update-order-labour.dto.ts";
import { ORDER_LABOURS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useUpdateOrderLabour = (labourId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateOrderLabourDto: UpdateOrderLabourDto) => OrdersApi.updateLabour(labourId, updateOrderLabourDto),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [ORDER_LABOURS_QUERY_KEY] });
    },
  });
};

export default useUpdateOrderLabour;
