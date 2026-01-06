import AlloysApi from "@entities/alloy/api/alloys.api.ts";
import { ALLOY_QUERY_KEY, ALLOYS_LIST_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { CreateAlloyDto } from "@entities/alloy/dto/create-alloy.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateAlloy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateAlloyDto) => AlloysApi.create(dto),
    onSuccess: ({ id }) => {
      void queryClient.invalidateQueries({ queryKey: [ALLOYS_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALLOY_QUERY_KEY, id] });
    },
  });
};

export default useCreateAlloy;
