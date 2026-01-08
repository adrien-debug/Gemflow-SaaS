import OtherMaterialsApi from "@entities/other-material/api/other-materials.api.ts";
import { OTHER_MATERIALS_QUERY_KEY } from "@entities/other-material/constants/query-keys.ts";
import { OtherMaterial } from "@entities/other-material/model/other-material.model.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteOtherMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => OtherMaterialsApi.delete(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: [OTHER_MATERIALS_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData<Pageable<OtherMaterial>>({
        queryKey: [OTHER_MATERIALS_QUERY_KEY],
      });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<OtherMaterial>) => ({
            ...old,
            content: old?.content?.filter((alloyedMetal: OtherMaterial) => alloyedMetal.id !== id),
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
      void queryClient.invalidateQueries({ queryKey: [OTHER_MATERIALS_QUERY_KEY] });
    },
  });
};
