import { useMutation, useQueryClient } from "@tanstack/react-query";
import CrmContactApi from "@entities/crm-contact/api/crm-contact.api";
import { CRM_CONTACT_QUERY_KEYS } from "@entities/crm-contact/constants/query-keys";

const useDeleteCrmContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactId: number) => CrmContactApi.delete(contactId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CRM_CONTACT_QUERY_KEYS.all });
    },
  });
};

export default useDeleteCrmContact;

