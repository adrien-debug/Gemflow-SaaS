import api from "@shared/api";
import { PageRequestModel } from "@shared/types/page-request.model";
import { Pageable } from "@shared/types/pageable.model";
import { CrmContact } from "@entities/crm-contact/models/crm-contact.model";
import { CrmContactDto } from "@entities/crm-contact/dto/crm-contact.dto";

const CrmContactApi = {
  search: async (pageRequest: PageRequestModel): Promise<Pageable<CrmContact>> => {
    return api.post("/api/v1/crm/contacts/search", pageRequest);
  },

  create: async (dto: CrmContactDto): Promise<CrmContact> => {
    return api.post("/api/v1/crm/contacts", dto);
  },

  update: async (contactId: number, dto: CrmContactDto): Promise<CrmContact> => {
    return api.put(`/api/v1/crm/contacts/${contactId}`, dto);
  },

  get: async (contactId: number): Promise<CrmContact> => {
    return api.get(`/api/v1/crm/contacts/${contactId}`);
  },

  delete: async (contactId: number): Promise<void> => {
    return api.delete(`/api/v1/crm/contacts/${contactId}`);
  },
};

export default CrmContactApi;

