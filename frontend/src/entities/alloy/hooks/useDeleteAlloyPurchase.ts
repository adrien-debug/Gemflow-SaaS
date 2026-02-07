import { AlloyPurchasesApi } from "@entities/alloy/api/alloy-purchases.api.ts";
import { ALLOY_QUERY_KEY, ALLOYS_PURCHASES_LIST_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlloyPurchase } from "../models/alloy-purchase.model";
import { Pageable } from "@shared/types/pageable.model.ts";

export const useDeleteAlloyPurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => AlloyPurchasesApi.delete(id),
    onMutate: async (purchaseId: number) => {
      await queryClient.cancelQueries({ queryKey: [ALLOYS_PURCHASES_LIST_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData<Pageable<AlloyPurchase>>({
        queryKey: [ALLOYS_PURCHASES_LIST_QUERY_KEY],
      });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<AlloyPurchase>) => ({
            ...old,
            content: old?.content?.filter((purchase: AlloyPurchase) => purchase.id !== purchaseId),
          }));
        }
      });

      return { snapshots };
    },
    onError: (_, __, context) => {
      context?.snapshots.forEach(([queryKey, snapshot]) => {
        queryClient.setQueryData(queryKey, snapshot);
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: [ALLOYS_PURCHASES_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALLOY_QUERY_KEY] });
    },
  });
};
