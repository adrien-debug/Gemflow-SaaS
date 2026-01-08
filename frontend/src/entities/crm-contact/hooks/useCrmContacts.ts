import { useQuery } from "@tanstack/react-query";
import { PageRequestModel } from "@shared/types/page-request.model";
import CrmContactApi from "@entities/crm-contact/api/crm-contact.api";
import { CRM_CONTACT_QUERY_KEYS } from "@entities/crm-contact/constants/query-keys";

const useCrmContacts = (pageRequest: PageRequestModel) => {
  return useQuery({
    queryKey: CRM_CONTACT_QUERY_KEYS.list(pageRequest),
    queryFn: () => CrmContactApi.search(pageRequest),
  });
};

export default useCrmContacts;

