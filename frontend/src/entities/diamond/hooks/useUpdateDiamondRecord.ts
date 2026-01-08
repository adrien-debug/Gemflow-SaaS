import { useMutation, useQueryClient } from "@tanstack/react-query";
import DiamondRecordApi from "@entities/diamond/api/diamond-record.api.ts";
import { DiamondRecordDto } from "@entities/diamond/dto/diamond-record.dto.ts";
import {
  DIAMOND_RECORDS_LIST_QUERY_KEY,
  DIAMONDS_TOTAL_VALUE_QUERY_KEY,
} from "@entities/diamond/constants/diamond-query-keys.ts";

const useUpdateDiamondRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: DiamondRecordDto }) => DiamondRecordApi.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DIAMOND_RECORDS_LIST_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [DIAMONDS_TOTAL_VALUE_QUERY_KEY] });
    },
  });
};

export default useUpdateDiamondRecord;
