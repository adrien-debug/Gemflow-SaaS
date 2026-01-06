import { useQuery } from "@tanstack/react-query";
import CastingApi from "@entities/casting/api/casting.api.ts";
import { CASTING_QUERY_KEY } from "@entities/casting/constants/query-keys.ts";

const useCasting = (id: number) => {
  return useQuery({
    queryFn: () => CastingApi.getById(id),
    queryKey: [CASTING_QUERY_KEY, id],
    enabled: !!id,
  });
};

export default useCasting;
