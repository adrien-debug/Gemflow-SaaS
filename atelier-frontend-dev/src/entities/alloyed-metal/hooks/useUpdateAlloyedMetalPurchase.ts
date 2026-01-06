import { AlloyedMetalPurchasesApi } from "@entities/alloyed-metal/api/alloyed-metal-purchases.api.ts";
import {
  ALLOYED_METAL_PURCHASES_QUERY_KEY,
  ALLOYED_METAL_QUERY_KEY,
} from "@entities/alloyed-metal/constants/query-keys.ts";
import { UpdateAlloyedMetalPurchaseDto } from "@entities/alloyed-metal/dto/update-alloyed-metal-purchase.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateAlloyedMetalPurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateAlloyedMetalPurchaseDto }) =>
      AlloyedMetalPurchasesApi.update(id, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METAL_PURCHASES_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METAL_QUERY_KEY] });
    },
  });
};

export default useUpdateAlloyedMetalPurchase;
