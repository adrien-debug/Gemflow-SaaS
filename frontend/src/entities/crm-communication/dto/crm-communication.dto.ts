import { CommunicationType, CommunicationDirection } from "@entities/crm-communication/models/crm-communication.model";

export interface CrmCommunicationDto {
  contactId?: number;
  clientId?: number;
  type: CommunicationType;
  direction?: CommunicationDirection;
  subject?: string;
  content?: string;
}

