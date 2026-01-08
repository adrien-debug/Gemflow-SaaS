import { useMutation, useQueryClient } from "@tanstack/react-query";
import ClientApi from "@entities/client/api/client.api";
import { CLIENTS_LIST_QUERY_KEY } from "@entities/client/hooks/constants";
import { Client } from "@entities/client/model/client.model";
import { Pageable } from "@shared/types/pageable.model.ts";

const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: number) => ClientApi.delete(clientId),
    onMutate: async (clientId: number) => {
      await queryClient.cancelQueries({ queryKey: [CLIENTS_LIST_QUERY_KEY] });

      const snapshots = queryClient.getQueriesData({ queryKey: [CLIENTS_LIST_QUERY_KEY] });

      snapshots.forEach(([queryKey, snapshot]) => {
        if (snapshot) {
          queryClient.setQueryData(queryKey, (old: Pageable<Client>) => ({
            ...old,
            content: old?.content?.filter((client: Client) => client.id !== clientId),
          }));
        }
      });

      return { snapshots };
    },

    onError: (_, __, context) => {
      context?.snapshots.forEach(([queryKey, snapshot]) => {
        queryClient.setQueryData(queryKey, snapshot);
      });
    },

    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: [CLIENTS_LIST_QUERY_KEY],
      });
    },
  });
};

export default useDeleteClient;
