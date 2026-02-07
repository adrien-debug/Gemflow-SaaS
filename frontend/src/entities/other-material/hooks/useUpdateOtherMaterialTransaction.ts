import OtherMaterialTransactionsApi from "@entities/other-material/api/other-material-transactions.api.ts";
import { OTHER_MATERIAL_TRANSACTIONS_QUERY_KEY } from "@entities/other-material/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateOtherMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: { description: string } }) =>
      OtherMaterialTransactionsApi.update(id, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [OTHER_MATERIAL_TRANSACTIONS_QUERY_KEY] });
    },
  });
};

export default useUpdateOtherMaterial;
