import GemstoneApi from "@entities/gemstone/api/gemstone.api.ts";
import {
  GEMSTONE_LIST_QUERY_KEY,
  GEMSTONE_QUERY_KEY,
  GEMSTONES_SEARCH_QUERY_KEY,
} from "@entities/gemstone/constants/query-keys.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteGemstone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => GemstoneApi.delete(id),
    onSuccess: (_, id: number) => {
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_LIST_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONES_SEARCH_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [GEMSTONE_QUERY_KEY, id] });
    },
  });
};

export default useDeleteGemstone;
