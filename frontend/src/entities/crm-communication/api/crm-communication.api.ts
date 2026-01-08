import api from "@shared/api";
import { CrmCommunication, SendEmailDto } from "@entities/crm-communication/models/crm-communication.model";
import { CrmCommunicationDto } from "@entities/crm-communication/dto/crm-communication.dto";

const CrmCommunicationApi = {
  create: async (dto: CrmCommunicationDto): Promise<CrmCommunication> => {
    return api.post("/api/v1/crm/communications", dto);
  },

  get: async (communicationId: number): Promise<CrmCommunication> => {
    return api.get(`/api/v1/crm/communications/${communicationId}`);
  },

  getByContact: async (contactId: number): Promise<CrmCommunication[]> => {
    return api.get(`/api/v1/crm/communications/by-contact/${contactId}`);
  },

  getByClient: async (clientId: number): Promise<CrmCommunication[]> => {
    return api.get(`/api/v1/crm/communications/by-client/${clientId}`);
  },

  sendEmail: async (dto: SendEmailDto): Promise<void> => {
    return api.post("/api/v1/crm/communications/send-email", dto);
  },

  delete: async (communicationId: number): Promise<void> => {
    return api.delete(`/api/v1/crm/communications/${communicationId}`);
  },
};

export default CrmCommunicationApi;

