import AlloysApi from "@entities/alloy/api/alloys.api.ts";
import { ALLOY_QUERY_KEY } from "@entities/alloy/constants/query-keys.ts";
import { Alloy } from "@entities/alloy/models/alloy.model.ts";
import { useQuery } from "@tanstack/react-query";

export const useAlloy = (id: number) =>
  useQuery<Alloy>({
    queryKey: [ALLOY_QUERY_KEY, id],
    queryFn: () => AlloysApi.getById(id),
    staleTime: 60000,
  });
