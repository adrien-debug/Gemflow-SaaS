import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateCadDetailsDto } from "@entities/order/dto/update-cad-details.dto.ts";
import OrdersApi from "@entities/order/api/orders.api.ts";
import { CAD_DETAILS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useUpdateCadDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateCadDetailsDto }) => OrdersApi.updateCadDetails(id, dto),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [CAD_DETAILS_QUERY_KEY, id] });
    },
  });
};

export default useUpdateCadDetails;
