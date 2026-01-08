import { OTHER_MATERIALS_QUERY_KEY } from "@entities/other-material/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OtherMaterialsApi from "@entities/other-material/api/other-materials.api.ts";

const useCreateOtherMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: { name: string }) => OtherMaterialsApi.create(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [OTHER_MATERIALS_QUERY_KEY] });
    },
  });
};

export default useCreateOtherMaterial;
