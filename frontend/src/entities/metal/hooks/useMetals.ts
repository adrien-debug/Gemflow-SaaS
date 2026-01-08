import { useQuery } from "@tanstack/react-query";
import MetalsApi from "@entities/metal/api/metals.api.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { METALS_QUERY_KEY } from "@entities/metal/constants/query-keys.ts";

const useMetals = () => {
  return useQuery<BaseItem[]>({
    queryKey: [METALS_QUERY_KEY],
    queryFn: () => MetalsApi.getMetals(),
    staleTime: 60000,
  });
};

export default useMetals;
