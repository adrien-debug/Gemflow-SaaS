import { AlloyedMetalsApi } from "@entities/alloyed-metal/api/alloyed-metals.api.ts";
import {
  ALLOYED_METAL_PURCHASES_QUERY_KEY,
  ALLOYED_METAL_QUERY_KEY,
  ALLOYED_METALS_LIST_QUERY_KEY,
} from "@entities/alloyed-metal/constants/query-keys.ts";
import { UpdateAlloyedMetalDto } from "@entities/alloyed-metal/dto/update-alloyed-metal.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateAlloyedMetal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateAlloyedMetalDto }) => AlloyedMetalsApi.update(id, dto),
    onSuccess: (alloyedMetal) => {
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METALS_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALLOYED_METAL_QUERY_KEY, alloyedMetal.id] });
      void queryClient.invalidateQueries({
        queryKey: [ALLOYED_METAL_PURCHASES_QUERY_KEY, { searchCriteria: { alloyedMetalIds: [alloyedMetal.id] } }],
      });
    },
  });
};

export default useUpdateAlloyedMetal;
