import { GEMSTONE_QUERY_KEY } from "@entities/gemstone/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateGemstoneDto } from "@entities/gemstone/dto/create-gemstone.dto";
import GemstoneApi from "../api/gemstone.api";

const useUpdateGemstone = (gemstoneId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateGemstoneDto) => GemstoneApi.update(gemstoneId, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_QUERY_KEY, gemstoneId] });
    },
  });
};

export default useUpdateGemstone;
