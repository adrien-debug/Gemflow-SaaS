import { useMutation, useQueryClient } from "@tanstack/react-query";
import CrmCommunicationApi from "@entities/crm-communication/api/crm-communication.api";
import { CrmCommunicationDto } from "@entities/crm-communication/dto/crm-communication.dto";
import { CRM_COMMUNICATION_QUERY_KEYS } from "@entities/crm-communication/constants/query-keys";

const useCreateCrmCommunication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CrmCommunicationDto) => CrmCommunicationApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CRM_COMMUNICATION_QUERY_KEYS.all });
    },
  });
};

export default useCreateCrmCommunication;

