import { useMutation, useQueryClient } from "@tanstack/react-query";
import DiamondUsageApi from "@entities/diamond/api/diamond-usage.api.ts";
import {
  DIAMOND_USAGE_QUERY_KEY,
  DIAMOND_USAGE_STATISTICS_QUERY_KEY,
  DIAMONDS_TOTAL_VALUE_QUERY_KEY,
} from "@entities/diamond/constants/diamond-query-keys.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";

const useUpdateGoodQualityDiamond = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: Omit<DiamondUsageDto, "orderId"> }) =>
      DiamondUsageApi.updateGoodQuality(id, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [DIAMOND_USAGE_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [DIAMONDS_TOTAL_VALUE_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [DIAMOND_USAGE_STATISTICS_QUERY_KEY] });
    },
  });
};

export default useUpdateGoodQualityDiamond;
