import { useMutation, useQueryClient } from "@tanstack/react-query";
import PureMetalsApi from "@entities/metal/api/pure-metals.api.ts";
import {
  PURE_METAL_SUMMARY_QUERY_KEY,
  PURE_METALS_PURCHASES_LIST_QUERY_KEY,
  PURE_METALS_SUMMARY_QUERY_KEY,
} from "@entities/metal/constants/query-keys.ts";

const useDeletePureMetalPurchase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => PureMetalsApi.deletePurchase(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [PURE_METALS_PURCHASES_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [PURE_METAL_SUMMARY_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [PURE_METALS_SUMMARY_QUERY_KEY] });
    },
  });
};

export default useDeletePureMetalPurchase;
