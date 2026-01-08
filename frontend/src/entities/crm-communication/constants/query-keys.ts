export const CRM_COMMUNICATION_QUERY_KEYS = {
  all: ["crm-communications"] as const,
  byContact: (contactId: number) => [...CRM_COMMUNICATION_QUERY_KEYS.all, "contact", contactId] as const,
  byClient: (clientId: number) => [...CRM_COMMUNICATION_QUERY_KEYS.all, "client", clientId] as const,
};

