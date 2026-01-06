import { useMutation, useQueryClient } from "@tanstack/react-query";
import CastingApi from "@entities/casting/api/casting.api.ts";
import { CASTING_LIST_QUERY_KEY } from "@entities/casting/constants/query-keys.ts";

const useDeleteCasting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => CastingApi.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CASTING_LIST_QUERY_KEY] });
    },
  });
};

export default useDeleteCasting;
