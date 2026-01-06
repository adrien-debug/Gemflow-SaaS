import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientDto } from "@entities/client/dto/client.dto";
import ClientApi from "@entities/client/api/client.api";
import { CLIENTS_LIST_QUERY_KEY } from "@entities/client/hooks/constants";

const useUpdateCLient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: ClientDto }) => ClientApi.update(id, dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CLIENTS_LIST_QUERY_KEY] });
    },
  });
};

export default useUpdateCLient;
