import { AlloyedMetalsApi } from "@entities/alloyed-metal/api/alloyed-metals.api.ts";
import { ALLOYED_METALS_LIST_QUERY_KEY } from "@entities/alloyed-metal/constants/query-keys.ts";
import { AlloyedMetal } from "@entities/alloyed-metal/models/alloyed-metal.model.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAlloyedMetal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => AlloyedMetalsApi.delete(id),
    onMutate: async (purchaseId: number) => {
      await queryClient.cancelQueries({ queryKey: [ALLOYED_METALS_LIST_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData<Pageable<AlloyedMetal>>({
        queryKey: [ALLOYED_METALS_LIST_QUERY_KEY],
      });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<AlloyedMetal>) => ({
            ...old,
            content: old?.content?.filter((alloyedMetal: AlloyedMetal) => alloyedMetal.id !== purchaseId),
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
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METALS_LIST_QUERY_KEY] });
    },
  });
};
