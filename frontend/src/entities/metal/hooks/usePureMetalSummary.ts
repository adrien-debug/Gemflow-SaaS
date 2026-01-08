import { useQuery } from "@tanstack/react-query";
import PureMetalsApi from "@entities/metal/api/pure-metals.api.ts";
import { PURE_METAL_SUMMARY_QUERY_KEY } from "@entities/metal/constants/query-keys.ts";

const usePureMetalSummary = (pureMetalId: number) => {
  return useQuery({
    queryFn: () => PureMetalsApi.getSummaryByPureMetalId(pureMetalId),
    queryKey: [PURE_METAL_SUMMARY_QUERY_KEY, pureMetalId],
    enabled: !!pureMetalId,
  });
};

export default usePureMetalSummary;
