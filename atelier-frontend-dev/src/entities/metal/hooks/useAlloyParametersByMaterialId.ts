import { useQuery } from "@tanstack/react-query";
import { ALLOY_PARAMETERS_QUERY_KEY } from "@entities/metal/constants/query-keys.ts";
import MetalsApi from "@entities/metal/api/metals.api.ts";

const useAlloyParametersByMaterialId = (materialId: number) => {
  return useQuery({
    queryKey: [ALLOY_PARAMETERS_QUERY_KEY, materialId],
    queryFn: () => MetalsApi.getAlloyParametersByMaterialId(materialId),
    retry: false,
    enabled: !!materialId,
  });
};

export default useAlloyParametersByMaterialId;
