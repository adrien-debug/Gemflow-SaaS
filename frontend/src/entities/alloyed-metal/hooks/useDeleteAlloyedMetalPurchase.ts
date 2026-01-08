import { AlloyedMetalPurchasesApi } from "@entities/alloyed-metal/api/alloyed-metal-purchases.api.ts";
import {
  ALLOYED_METAL_PURCHASES_QUERY_KEY,
  ALLOYED_METAL_QUERY_KEY,
} from "@entities/alloyed-metal/constants/query-keys.ts";
import { AlloyedMetalPurchase } from "@entities/alloyed-metal/models/alloyed-metal-purchase.model.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pageable } from "@shared/types/pageable.model";

export const useDeleteAlloyedMetalPurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => AlloyedMetalPurchasesApi.delete(id),
    onMutate: async (purchaseId: number) => {
      await queryClient.cancelQueries({ queryKey: [ALLOYED_METAL_PURCHASES_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData<Pageable<AlloyedMetalPurchase>>({
        queryKey: [ALLOYED_METAL_PURCHASES_QUERY_KEY],
      });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<AlloyedMetalPurchase>) => ({
            ...old,
            content: old?.content?.filter((purchase: AlloyedMetalPurchase) => purchase.id !== purchaseId),
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
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METAL_PURCHASES_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METAL_QUERY_KEY] });
    },
  });
};
