import { useQuery } from "@tanstack/react-query";
import CrmCommunicationApi from "@entities/crm-communication/api/crm-communication.api";
import { CRM_COMMUNICATION_QUERY_KEYS } from "@entities/crm-communication/constants/query-keys";

const useCrmCommunicationsByContact = (contactId: number) => {
  return useQuery({
    queryKey: CRM_COMMUNICATION_QUERY_KEYS.byContact(contactId),
    queryFn: () => CrmCommunicationApi.getByContact(contactId),
    enabled: !!contactId,
  });
};

export default useCrmCommunicationsByContact;

