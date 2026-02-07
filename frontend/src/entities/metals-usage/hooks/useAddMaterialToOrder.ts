import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddMaterialUsageDto } from "@entities/metals-usage/dto/add-material-usage.dto.ts";
import MetalsUsageApi from "@entities/metals-usage/api/metals-usage.api.ts";
import { METAL_USAGE_PRODUCTION_QUERY_KEY } from "@entities/metals-usage/constants/query-keys.ts";
import { ORDER_METAL_TOTALS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useAddMaterialToOrder = (orderId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createOrderMaterialUsageDto: AddMaterialUsageDto) =>
      MetalsUsageApi.addMaterialUsage(orderId, createOrderMaterialUsageDto),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [METAL_USAGE_PRODUCTION_QUERY_KEY, orderId] });
      void queryClient.invalidateQueries({ queryKey: [ORDER_METAL_TOTALS_QUERY_KEY, orderId] });
    },
  });
};

export default useAddMaterialToOrder;
