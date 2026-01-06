import { AlloyPurchasesApi } from "@entities/alloy/api/alloy-purchases.api.ts";
import { ALLOY_QUERY_KEY, ALLOYS_PURCHASES_LIST_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { AlloyPurchaseDto } from "@entities/alloy/dto/alloy-purchase.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateAlloyPurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: AlloyPurchaseDto }) => AlloyPurchasesApi.update(id, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ALLOYS_PURCHASES_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALLOY_QUERY_KEY] });
    },
  });
};

export default useUpdateAlloyPurchase;
