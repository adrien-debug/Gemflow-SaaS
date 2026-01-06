import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { CAD_DETAILS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useCopyCadDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ toOrderId, fromOrderId }: { toOrderId: number; fromOrderId: number }) =>
      OrdersApi.copyCadDetails(toOrderId, fromOrderId),
    onSuccess: (_, { toOrderId }) => {
      queryClient.invalidateQueries({ queryKey: [CAD_DETAILS_QUERY_KEY, toOrderId] });
    },
  });
};

export default useCopyCadDetails;
