import { useQuery } from "@tanstack/react-query";
import PureMetalsApi from "@entities/metal/api/pure-metals.api.ts";
import { PURCHASE_SUMMARY_QUERY_KEY } from "@entities/metal/constants/query-keys.ts";

const useSummaryPurchase = (purchaseId: number) => {
  return useQuery({
    queryFn: () => PureMetalsApi.getSummaryPurchaseById(purchaseId),
    queryKey: [PURCHASE_SUMMARY_QUERY_KEY, purchaseId],
  });
};

export default useSummaryPurchase;
