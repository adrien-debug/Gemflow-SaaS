export type CommunicationType = "EMAIL" | "CALL" | "MEETING" | "NOTE";
export type CommunicationDirection = "INBOUND" | "OUTBOUND";

export interface CrmCommunication {
  id: number;
  contactId?: number;
  contactName?: string;
  clientId?: number;
  clientName?: string;
  type: CommunicationType;
  direction?: CommunicationDirection;
  subject?: string;
  content?: string;
  sentAt?: string;
  createdById?: number;
  createdByName?: string;
  createdAt: string;
}

export interface SendEmailDto {
  contactId?: number;
  clientId?: number;
  to: string;
  subject: string;
  body: string;
  templateId?: number;
}

