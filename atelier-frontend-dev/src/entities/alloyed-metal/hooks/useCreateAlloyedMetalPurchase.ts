import { AlloyedMetalPurchasesApi } from "@entities/alloyed-metal/api/alloyed-metal-purchases.api.ts";
import {
  ALLOYED_METAL_PURCHASES_QUERY_KEY,
  ALLOYED_METAL_QUERY_KEY,
} from "@entities/alloyed-metal/constants/query-keys.ts";
import { CreateAlloyedMetalPurchaseDto } from "@entities/alloyed-metal/dto/create-alloyed-metal-purchase.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateAlloyedMetalPurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateAlloyedMetalPurchaseDto) => AlloyedMetalPurchasesApi.create(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METAL_PURCHASES_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METAL_QUERY_KEY] });
    },
  });
};

export default useCreateAlloyedMetalPurchase;
