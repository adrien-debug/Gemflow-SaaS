import { AlloyPurchasesApi } from "@entities/alloy/api/alloy-purchases.api.ts";
import { ALLOY_QUERY_KEY, ALLOYS_PURCHASES_LIST_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { AlloyPurchaseDto } from "@entities/alloy/dto/alloy-purchase.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateAlloyPurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: AlloyPurchaseDto) => AlloyPurchasesApi.create(dto),
    onSuccess: async ({ alloy }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [ALLOYS_PURCHASES_LIST_QUERY_KEY] }),
        queryClient.invalidateQueries({ queryKey: [ALLOY_QUERY_KEY, alloy.id] }),
      ]);
    },
  });
};

export default useCreateAlloyPurchase;
