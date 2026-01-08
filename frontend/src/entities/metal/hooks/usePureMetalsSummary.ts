import { useQuery } from "@tanstack/react-query";
import { PURE_METALS_SUMMARY_QUERY_KEY } from "@entities/metal/constants/query-keys.ts";
import { PureMetalSummary } from "@entities/metal/models/pure-metals-summary.model.ts";
import PureMetalsApi from "@entities/metal/api/pure-metals.api.ts";

const usePureMetalsSummary = () => {
  return useQuery<PureMetalSummary[]>({
    queryKey: [PURE_METALS_SUMMARY_QUERY_KEY],
    queryFn: PureMetalsApi.getSummary,
  });
};

export default usePureMetalsSummary;
