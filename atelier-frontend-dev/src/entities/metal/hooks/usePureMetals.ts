import { useQuery } from "@tanstack/react-query";
import { PURE_METALS_LIST_QUERY_KEY } from "@entities/metal/constants/query-keys.ts";
import PureMetalsApi from "@entities/metal/api/pure-metals.api.ts";

const usePureMetals = () => {
  return useQuery({
    queryKey: [PURE_METALS_LIST_QUERY_KEY],
    queryFn: PureMetalsApi.getAll,
  });
};

export default usePureMetals;
