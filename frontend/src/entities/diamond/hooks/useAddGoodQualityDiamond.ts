import { useMutation, useQueryClient } from "@tanstack/react-query";
import DiamondUsageApi from "@entities/diamond/api/diamond-usage.api.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import {
  DIAMOND_USAGE_QUERY_KEY,
  DIAMOND_USAGE_STATISTICS_QUERY_KEY,
} from "@entities/diamond/constants/diamond-query-keys.ts";

const useAddGoodQualityDiamond = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: DiamondUsageDto) => DiamondUsageApi.addGoodQuality(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [DIAMOND_USAGE_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [DIAMOND_USAGE_STATISTICS_QUERY_KEY] });
    },
  });
};

export default useAddGoodQualityDiamond;
