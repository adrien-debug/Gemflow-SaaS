import AlloysApi from "@entities/alloy/api/alloys.api.ts";
import { ALLOY_QUERY_KEY, ALLOYS_LIST_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { UpdateAlloyDto } from "@entities/alloy/dto/update-alloy.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateAlloy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateAlloyDto }) => AlloysApi.update(id, dto),
    onSuccess: (alloy) => {
      void queryClient.invalidateQueries({ queryKey: [ALLOYS_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALLOY_QUERY_KEY, alloy.id] });
    },
  });
};

export default useUpdateAlloy;
