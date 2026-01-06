import AlloysApi from "@entities/alloy/api/alloys.api.ts";
import { ALLOYS_LIST_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { Alloy } from "@entities/alloy/models/alloy.model.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAlloy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => AlloysApi.delete(id),
    onMutate: async (purchaseId: number) => {
      await queryClient.cancelQueries({ queryKey: [ALLOYS_LIST_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData<Pageable<Alloy>>({
        queryKey: [ALLOYS_LIST_QUERY_KEY],
      });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<Alloy>) => ({
            ...old,
            content: old?.content?.filter((alloy: Alloy) => alloy.id !== purchaseId),
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
      void queryClient.invalidateQueries({ queryKey: [ALLOYS_LIST_QUERY_KEY] });
    },
  });
};
