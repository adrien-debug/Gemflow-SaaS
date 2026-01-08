import { AlloyedMetalsApi } from "@entities/alloyed-metal/api/alloyed-metals.api.ts";
import { ALLOYED_METAL_QUERY_KEY } from "@entities/alloyed-metal/constants/query-keys.ts";
import { AlloyedMetal } from "@entities/alloyed-metal/models/alloyed-metal.model.ts";
import { useQuery } from "@tanstack/react-query";

export const useAlloyedMetal = (id: number) =>
  useQuery<AlloyedMetal>({
    queryKey: [ALLOYED_METAL_QUERY_KEY, id],
    queryFn: () => AlloyedMetalsApi.getById(id),
    staleTime: 60000,
    enabled: !!id,
  });
