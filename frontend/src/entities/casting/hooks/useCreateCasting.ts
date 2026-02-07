import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CastingDto } from "@entities/casting/dto/casting.dto.ts";
import CastingApi from "@entities/casting/api/casting.api.ts";
import { CASTING_LIST_QUERY_KEY } from "@entities/casting/constants/query-keys.ts";
import { CYLINDERS_LIST_QUERY_KEY, CYLINDERS_QUERY_KEY } from "@entities/cylinder/constants/query-keys.ts";

const useCreateCasting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CastingDto) => CastingApi.create(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CASTING_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [CYLINDERS_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [CYLINDERS_LIST_QUERY_KEY] });
    },
  });
};

export default useCreateCasting;
