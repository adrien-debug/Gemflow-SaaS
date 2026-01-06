import { keepPreviousData, useQuery } from "@tanstack/react-query";
import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";
import { GEMSTONE_PAYMENT_STATUSES_QUERY_KEY } from "@entities/gemstone/constants/query-keys.ts";

const useGemstonePaymentStatuses = () => {
  return useQuery({
    queryKey: [GEMSTONE_PAYMENT_STATUSES_QUERY_KEY],
    queryFn: GemstoneApi.getPaymentStatuses,
    placeholderData: keepPreviousData,
  });
};

export default useGemstonePaymentStatuses;
