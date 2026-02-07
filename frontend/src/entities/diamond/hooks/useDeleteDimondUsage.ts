import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DIAMOND_USAGE_QUERY_KEY,
  DIAMOND_USAGE_STATISTICS_QUERY_KEY,
  DIAMONDS_TOTAL_VALUE_QUERY_KEY,
} from "@entities/diamond/constants/diamond-query-keys.ts";
import DiamondUsageApi from "@entities/diamond/api/diamond-usage.api.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";

const useDeleteDiamondUsage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => DiamondUsageApi.delete(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: [DIAMOND_USAGE_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData<Pageable<DiamondRecord>>({
        queryKey: [DIAMOND_USAGE_QUERY_KEY],
      });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<DiamondRecord>) => ({
            ...old,
            content: old.content.filter((diamond) => diamond.id !== id),
          }));
        }
      });

      return { snapshots };
    },
    onError: (_, __, context) => {
      context?.snapshots?.forEach(([queryKey, snapshot]) => {
        queryClient.setQueryData(queryKey, snapshot);
      });
    },
    onSettled: async () => {
      void queryClient.invalidateQueries({ queryKey: [DIAMOND_USAGE_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [DIAMONDS_TOTAL_VALUE_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [DIAMOND_USAGE_STATISTICS_QUERY_KEY] });
    },
  });
};

export default useDeleteDiamondUsage;
