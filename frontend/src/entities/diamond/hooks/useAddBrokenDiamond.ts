import { useMutation, useQueryClient } from "@tanstack/react-query";
import DiamondUsageApi from "@entities/diamond/api/diamond-usage.api.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import { DIAMOND_USAGE_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";

const useAddBrokenDiamond = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: DiamondUsageDto) => DiamondUsageApi.addBroken(dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [DIAMOND_USAGE_QUERY_KEY] });
    },
  });
};

export default useAddBrokenDiamond;
