import { useQuery } from "@tanstack/react-query";
import { DIAMOND_USAGE_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";
import DiamondUsageApi from "@entities/diamond/api/diamond-usage.api.ts";
import { DiamondUsageMetadata } from "@entities/diamond/models/diamond-usage-metadata.model.ts";

export const useOrderDiamond = (id?: number) =>
  useQuery<DiamondUsageMetadata>({
    queryKey: [DIAMOND_USAGE_QUERY_KEY, id],
    queryFn: () => DiamondUsageApi.getOrderDiamond(id!),
    enabled: !!id,
  });
