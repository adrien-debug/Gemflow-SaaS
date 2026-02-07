import OtherMaterialsApi from "@entities/other-material/api/other-materials.api.ts";
import { OTHER_MATERIAL_QUERY_KEY, OTHER_MATERIALS_QUERY_KEY } from "@entities/other-material/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateOtherMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: { name: string } }) => OtherMaterialsApi.update(id, dto),
    onSuccess: (otherMaterial) => {
      void queryClient.invalidateQueries({ queryKey: [OTHER_MATERIALS_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [OTHER_MATERIAL_QUERY_KEY, otherMaterial.id] });
    },
  });
};

export default useUpdateOtherMaterial;
