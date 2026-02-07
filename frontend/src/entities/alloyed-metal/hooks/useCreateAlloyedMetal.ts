import { AlloyedMetalsApi } from "@entities/alloyed-metal/api/alloyed-metals.api.ts";
import { ALLOYED_METALS_LIST_QUERY_KEY } from "@entities/alloyed-metal/constants/query-keys.ts";
import { CreateAlloyedMetalDto } from "@entities/alloyed-metal/dto/create-alloyed-metal.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateAlloyedMetal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateAlloyedMetalDto) => AlloyedMetalsApi.create(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METALS_LIST_QUERY_KEY] });
    },
  });
};

export default useCreateAlloyedMetal;
