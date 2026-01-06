import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CastingDto } from "@entities/casting/dto/casting.dto.ts";
import CastingApi from "@entities/casting/api/casting.api.ts";
import { CASTING_LIST_QUERY_KEY, CASTING_QUERY_KEY } from "@entities/casting/constants/query-keys.ts";

const useUpdateCasting = (castingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CastingDto) => CastingApi.update(castingId, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CASTING_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [CASTING_QUERY_KEY] });
    },
  });
};

export default useUpdateCasting;
