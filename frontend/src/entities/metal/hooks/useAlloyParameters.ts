import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MetalsService from "@entities/metal/api/metals.api.ts";
import useSingleTagList from "@shared/hooks/useSingleTagList.ts";
import { UpdateAlloysDto } from "@entities/metal/dto/update-alloys.dto.ts";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";
import PureMetalsApi from "@entities/metal/api/pure-metals.api.ts";
import { ALLOY_PARAMETERS_QUERY_KEY } from "@entities/metal/constants/query-keys.ts";

const useAlloyParameters = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [ALLOY_PARAMETERS_QUERY_KEY],
    queryFn: MetalsService.getAlloyParameters,
  });

  const { tagItems: metalLabels } = useSingleTagList({
    fetcher: PureMetalsApi.getAll,
    key: "metalPriceLabels",
  });

  const { tagItems: metals } = useSingleTagList({
    fetcher: MetalsService.getMetals,
    key: "metals",
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [ALLOY_PARAMETERS_QUERY_KEY] });
  };

  const mutation = useMutation({
    mutationFn: (updateDto: BatchUpdateDto<UpdateAlloysDto>) => MetalsService.updateAlloyParameters(updateDto),
    onSuccess: () => {
      invalidate();
    },
  });

  return {
    alloys: query.data,
    alloysLoading: query.isLoading,
    invalidate,
    metalLabels,
    metals,
    mutation,
  };
};

export default useAlloyParameters;
