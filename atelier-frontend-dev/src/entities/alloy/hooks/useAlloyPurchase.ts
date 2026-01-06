import { useQuery } from "@tanstack/react-query";
import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import { AlloyPurchasesApi } from "@entities/alloy/api/alloy-purchases.api.ts";
import { ALLOY_PURCHASE_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";

export const useAlloyPurchase = (id: number) =>
  useQuery<AlloyPurchase>({
    queryKey: [ALLOY_PURCHASE_QUERY_KEY, id],
    queryFn: () => AlloyPurchasesApi.getById(id),
    staleTime: 60000,
  });
