import { useMutation, useQueryClient } from "@tanstack/react-query";
import DiamondUsageApi from "@entities/diamond/api/diamond-usage.api.ts";
import { DIAMOND_USAGE_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";
import { DiamondUsageQualityIssueDto } from "@entities/diamond/dto/diamond-usage-quality-issue.dto.ts";

const useAddQualityIssueDiamond = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: DiamondUsageQualityIssueDto) => DiamondUsageApi.addQualityIssue(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [DIAMOND_USAGE_QUERY_KEY] });
    },
  });
};

export default useAddQualityIssueDiamond;
