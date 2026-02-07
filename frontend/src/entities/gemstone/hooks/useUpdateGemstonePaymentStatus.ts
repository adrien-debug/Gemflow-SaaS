import { useMutation, useQueryClient } from "@tanstack/react-query";
import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";
import {
  GEMSTONE_LIST_QUERY_KEY,
  GEMSTONE_QUERY_KEY,
  GEMSTONES_SEARCH_QUERY_KEY,
  GEMSTONE_PAYMENT_STATUSES_QUERY_KEY,
} from "@entities/gemstone/constants/query-keys.ts";
import { Pageable } from "@shared/types/pageable.model.ts";
import { Gemstone } from "@entities/gemstone/models/gemstone.model";
import { BaseItem } from "@shared/types/base-item.type";

const useUpdateGemstonePaymentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, paymentStatusId }: { id: number; paymentStatusId: number }) =>
      GemstoneApi.updateGemstonePaymentStatus(id, paymentStatusId),
    onMutate: async ({
      id,
      paymentStatusId,
      paymentStatuses,
    }: {
      id: number;
      paymentStatusId: number;
      paymentStatuses?: BaseItem[];
    }) => {
      await queryClient.cancelQueries({ queryKey: [GEMSTONE_LIST_QUERY_KEY] });
      const snapshots = queryClient.getQueriesData<Pageable<Gemstone>>({ queryKey: [GEMSTONE_LIST_QUERY_KEY] });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, {
            ...snapshot,
            content: snapshot.content?.map((gemstone: Gemstone) => ({
              ...gemstone,
              paymentStatus:
                gemstone.id === id
                  ? paymentStatuses?.find((status) => status.id === paymentStatusId)
                  : gemstone.paymentStatus,
            })),
          });
        }
      });

      return { snapshots };
    },
    onError: (_, __, context) => {
      context?.snapshots?.forEach(([queryKey, snapshot]) => {
        queryClient.setQueryData(queryKey, snapshot);
      });
    },
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONES_SEARCH_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_QUERY_KEY, id] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_PAYMENT_STATUSES_QUERY_KEY] });
    },
  });
};

export default useUpdateGemstonePaymentStatus;
