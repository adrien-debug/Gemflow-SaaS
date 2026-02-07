import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddGemstoneToOrderDto } from "@entities/gemstone/dto/add-gemstone-to-order.dto.ts";
import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";
import {
  GEMSTONE_LIST_QUERY_KEY,
  GEMSTONE_QUERY_KEY,
  GEMSTONE_USAGE_STATISTICS_QUERY_KEY,
} from "@entities/gemstone/constants/query-keys.ts";
import { ORDER_QUERY_KEY } from "@entities/order/constants/query-keys.ts";

const useAddGemstoneToOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, dto }: { orderId: number; dto: AddGemstoneToOrderDto }) =>
      GemstoneApi.addGemstoneToOrder(orderId, dto),
    onSuccess: (_, { orderId, dto }) => {
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_USAGE_STATISTICS_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ORDER_QUERY_KEY, orderId] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_QUERY_KEY, dto.gemstoneId] });
    },
  });
};

export default useAddGemstoneToOrder;
