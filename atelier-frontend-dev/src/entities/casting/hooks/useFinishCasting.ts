import { useMutation, useQueryClient } from "@tanstack/react-query";
import CastingApi from "@entities/casting/api/casting.api.ts";
import { CASTING_LIST_QUERY_KEY, CASTING_QUERY_KEY } from "@entities/casting/constants/query-keys.ts";

const useFinishCasting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, alloyedMetalId }: { id: number; alloyedMetalId: number }) =>
      CastingApi.finish(id, alloyedMetalId),
    onSettled: (id) => {
      void queryClient.invalidateQueries({ queryKey: [CASTING_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [CASTING_QUERY_KEY, id] });
    },
  });
};

export default useFinishCasting;
