import { useMutation, useQueryClient } from "@tanstack/react-query";
import CrmCommunicationApi from "@entities/crm-communication/api/crm-communication.api";
import { SendEmailDto } from "@entities/crm-communication/models/crm-communication.model";
import { CRM_COMMUNICATION_QUERY_KEYS } from "@entities/crm-communication/constants/query-keys";

const useSendEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: SendEmailDto) => CrmCommunicationApi.sendEmail(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CRM_COMMUNICATION_QUERY_KEYS.all });
    },
  });
};

export default useSendEmail;

