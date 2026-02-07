import { useMutation, useQueryClient } from "@tanstack/react-query";
import DiamondUsageApi from "@entities/diamond/api/diamond-usage.api.ts";
import { DIAMOND_USAGE_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";

const useUpdateQualityIssueDiamond = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: Omit<DiamondUsageDto, "orderId"> }) =>
      DiamondUsageApi.updateQualityIssue(id, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [DIAMOND_USAGE_QUERY_KEY] });
    },
  });
};

export default useUpdateQualityIssueDiamond;
