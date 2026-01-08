export const PERMISSION_QUERY_KEYS = {
  all: ['permissions'] as const,
  list: () => [...PERMISSION_QUERY_KEYS.all, 'list'] as const,
  matrix: (tenantId: number) => [...PERMISSION_QUERY_KEYS.all, 'matrix', tenantId] as const,
  userPermissions: (userId: number) => [...PERMISSION_QUERY_KEYS.all, 'user', userId] as const,
};


