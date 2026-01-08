export const CRM_CONTACT_QUERY_KEYS = {
  all: ["crm-contacts"] as const,
  lists: () => [...CRM_CONTACT_QUERY_KEYS.all, "list"] as const,
  list: (params: object) => [...CRM_CONTACT_QUERY_KEYS.lists(), params] as const,
  details: () => [...CRM_CONTACT_QUERY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...CRM_CONTACT_QUERY_KEYS.details(), id] as const,
};

