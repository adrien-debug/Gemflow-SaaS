import { useMutation, useQueryClient } from "@tanstack/react-query";
import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";
import {
  GEMSTONE_LIST_QUERY_KEY,
  GEMSTONE_QUERY_KEY,
  GEMSTONE_USAGE_STATISTICS_QUERY_KEY,
  GEMSTONES_SEARCH_QUERY_KEY,
} from "@entities/gemstone/constants/query-keys.ts";
import { ORDER_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useDeleteGemstoneFromOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, gemstoneId }: { orderId: number; gemstoneId: number }) =>
      GemstoneApi.deleteGemstoneFromOrder(orderId, gemstoneId),
    onSuccess: (_, { orderId, gemstoneId }) => {
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_USAGE_STATISTICS_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONES_SEARCH_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY, orderId] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_QUERY_KEY, gemstoneId] });
    },
  });
};

export default useDeleteGemstoneFromOrder;
