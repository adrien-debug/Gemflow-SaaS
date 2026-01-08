import { ORDER_LABOURS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";

const useDeleteOrderLabour = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (labourId: number) => OrdersApi.deleteLabour(labourId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ORDER_LABOURS_QUERY_KEY] });
    },
  });
};

export default useDeleteOrderLabour;
