import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";
import {
  GEMSTONE_LIST_QUERY_KEY,
  GEMSTONE_QUERY_KEY,
  GEMSTONES_SEARCH_QUERY_KEY,
} from "@entities/gemstone/constants/query-keys.ts";
import { UpdateGemstoneStatusDto } from "@entities/gemstone/dto/update-gemstone-status.dto.ts";
import { Gemstone } from "@entities/gemstone/models/gemstone.model.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pageable } from "@shared/types/pageable.model.ts";

const useUpdateGemstoneStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateGemstoneStatusDto) => GemstoneApi.updateStatus(id, status),
    onMutate: async ({ id, status }: UpdateGemstoneStatusDto) => {
      await queryClient.cancelQueries({ queryKey: [GEMSTONE_LIST_QUERY_KEY] });
      const snapshots = queryClient.getQueriesData<Pageable<Gemstone>>({ queryKey: [GEMSTONE_LIST_QUERY_KEY] });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, {
            ...snapshot,
            content: snapshot.content?.map((gemstone: Gemstone) => ({
              ...gemstone,
              status: gemstone.id === id ? status : gemstone.status,
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
    },
  });
};

export default useUpdateGemstoneStatus;
