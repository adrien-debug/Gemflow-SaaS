import { useQuery } from "@tanstack/react-query";
import DiamondRecordApi from "@entities/diamond/api/diamond-record.api.ts";
import { DIAMONDS_TOTAL_VALUE_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";

const useDiamondsTotalValue = () => {
  return useQuery({
    queryFn: DiamondRecordApi.getTotalValue,
    queryKey: [DIAMONDS_TOTAL_VALUE_QUERY_KEY],
  });
};

export default useDiamondsTotalValue;
