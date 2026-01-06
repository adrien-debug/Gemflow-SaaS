import { useMutation, useQueryClient } from "@tanstack/react-query";
import MetalsUsageApi from "@entities/metals-usage/api/metals-usage.api.ts";
import { ReturnMaterialToInventoryDto } from "@entities/metals-usage/dto/return-material-to-inventory.dto.ts";
import { METAL_USAGE_PRODUCTION_QUERY_KEY } from "@entities/metals-usage/constants/query-keys.ts";
import { ORDER_METAL_TOTALS_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useReturnMaterialToInventory = (orderId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (returnMaterialDto: ReturnMaterialToInventoryDto) =>
      MetalsUsageApi.returnMaterialToInventory(orderId, returnMaterialDto),
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [METAL_USAGE_PRODUCTION_QUERY_KEY, orderId] });
      void queryClient.invalidateQueries({ queryKey: [ORDER_METAL_TOTALS_QUERY_KEY, orderId] });
    },
  });
};

export default useReturnMaterialToInventory;
