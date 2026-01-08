import { useQuery } from "@tanstack/react-query";
import CrmContactApi from "@entities/crm-contact/api/crm-contact.api";
import { CRM_CONTACT_QUERY_KEYS } from "@entities/crm-contact/constants/query-keys";

const useCrmContact = (contactId: number) => {
  return useQuery({
    queryKey: CRM_CONTACT_QUERY_KEYS.detail(contactId),
    queryFn: () => CrmContactApi.get(contactId),
    enabled: !!contactId,
  });
};

export default useCrmContact;

