import { useMutation, useQueryClient } from "@tanstack/react-query";
import DiamondRecordApi from "@entities/diamond/api/diamond-record.api.ts";
import { ChangeDiamondQuantityDto } from "@entities/diamond/dto/change-diamond-quantity.dto.ts";
import {
  DIAMOND_RECORDS_LIST_QUERY_KEY,
  DIAMONDS_TOTAL_VALUE_QUERY_KEY,
} from "@entities/diamond/constants/diamond-query-keys.ts";

const useAddDiamondQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: ChangeDiamondQuantityDto }) =>
      DiamondRecordApi.addDiamondQuantity(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DIAMOND_RECORDS_LIST_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [DIAMONDS_TOTAL_VALUE_QUERY_KEY] });
    },
  });
};

export default useAddDiamondQuantity;
