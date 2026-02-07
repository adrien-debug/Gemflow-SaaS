import { useQuery } from "@tanstack/react-query";
import OtherMaterialsApi from "@entities/other-material/api/other-materials.api.ts";
import { OTHER_MATERIAL_QUERY_KEY } from "../constants/query-keys";

const useOtherMaterial = (materialId: number) => {
  return useQuery({
    queryFn: () => OtherMaterialsApi.getById(materialId),
    queryKey: [OTHER_MATERIAL_QUERY_KEY, materialId],
    enabled: !!materialId,
  });
};

export default useOtherMaterial;
