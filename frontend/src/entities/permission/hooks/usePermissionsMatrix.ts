import { useQuery } from '@tanstack/react-query';
import { PermissionApi } from '../api/permission.api';
import { PERMISSION_QUERY_KEYS } from '../constants/query-keys';

export const usePermissionsMatrix = (tenantId: number = 1) => {
  return useQuery({
    queryKey: PERMISSION_QUERY_KEYS.matrix(tenantId),
    queryFn: () => PermissionApi.getPermissionsMatrix(tenantId),
  });
};


