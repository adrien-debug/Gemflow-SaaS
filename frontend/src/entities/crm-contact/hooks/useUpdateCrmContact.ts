import { useMutation, useQueryClient } from "@tanstack/react-query";
import CrmContactApi from "@entities/crm-contact/api/crm-contact.api";
import { CrmContactDto } from "@entities/crm-contact/dto/crm-contact.dto";
import { CRM_CONTACT_QUERY_KEYS } from "@entities/crm-contact/constants/query-keys";

interface UpdateParams {
  contactId: number;
  dto: CrmContactDto;
}

const useUpdateCrmContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ contactId, dto }: UpdateParams) => CrmContactApi.update(contactId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CRM_CONTACT_QUERY_KEYS.all });
    },
  });
};

export default useUpdateCrmContact;

