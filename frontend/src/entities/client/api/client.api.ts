import api from "@shared/api";
import { PageRequestModel } from "@shared/types/page-request.model";
import { Pageable } from "@shared/types/pageable.model.ts";
import { Client } from "@entities/client/model/client.model";
import { ClientDto } from "@entities/client/dto/client.dto";

const ClientApi = {
  search: async (pageRequest: PageRequestModel): Promise<Pageable<Client>> => {
    return api.post("/api/v1/clients/search", pageRequest);
  },

  create: async (clientDto: ClientDto): Promise<Client> => {
    return api.post("/api/v1/clients", clientDto);
  },

  delete: async (clientId: number): Promise<void> => {
    return api.delete(`/api/v1/clients/${clientId}`);
  },

  update: async (clientId: number, clienttDto: ClientDto): Promise<Client> => {
    return api.put(`/api/v1/clients/${clientId}`, clienttDto);
  },
};

export default ClientApi;
