import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";
import { GEMSTONE_QUERY_KEY } from "@entities/gemstone/constants/query-keys.ts";
import { Gemstone } from "@entities/gemstone/models/gemstone.model.ts";
import { useQuery } from "@tanstack/react-query";

export const useGemstone = (id?: number) =>
  useQuery<Gemstone>({
    queryKey: [GEMSTONE_QUERY_KEY, id],
    queryFn: () => GemstoneApi.getById(id!),
    enabled: !!id,
    staleTime: 60000,
  });
