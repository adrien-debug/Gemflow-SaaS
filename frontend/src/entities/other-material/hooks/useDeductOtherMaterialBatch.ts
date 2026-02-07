import OtherMaterialTransactionsApi from "@entities/other-material/api/other-material-transactions.api.ts";
import {
  OTHER_MATERIAL_QUERY_KEY,
  OTHER_MATERIAL_TRANSACTIONS_QUERY_KEY,
} from "@entities/other-material/constants/query-keys.ts";
import { CreateOtherMaterialTransactionDto } from "@entities/other-material/dto/create-other-material-transaction.dto.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeductOtherMaterialBatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateOtherMaterialTransactionDto) => OtherMaterialTransactionsApi.deduct(dto),
    onSuccess: (_, { otherMaterialId }) => {
      void queryClient.invalidateQueries({ queryKey: [OTHER_MATERIAL_TRANSACTIONS_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [OTHER_MATERIAL_QUERY_KEY, otherMaterialId] });
    },
  });
};

export default useDeductOtherMaterialBatch;
