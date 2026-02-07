import { CreateGemstoneDto } from "@entities/gemstone/dto/create-gemstone.dto";
import GemstoneApi from "@entities/gemstone/api/gemstone.api";
import { GEMSTONE_LIST_QUERY_KEY } from "@entities/gemstone/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateGemstone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateGemstoneDto) => GemstoneApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GEMSTONE_LIST_QUERY_KEY] });
    },
  });
};

export default useCreateGemstone;
