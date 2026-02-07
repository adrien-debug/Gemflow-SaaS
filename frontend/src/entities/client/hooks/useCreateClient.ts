import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientDto } from "@entities/client/dto/client.dto";
import ClientApi from "@entities/client/api/client.api";
import { CLIENTS_LIST_QUERY_KEY } from "@entities/client/hooks/constants";

const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ClientDto) => ClientApi.create(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [CLIENTS_LIST_QUERY_KEY] });
    },
  });
};

export default useCreateClient;
