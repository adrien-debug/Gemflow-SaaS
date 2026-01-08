import { useQuery } from '@tanstack/react-query';
import { PermissionApi } from '../api/permission.api';
import { PERMISSION_QUERY_KEYS } from '../constants/query-keys';

export const useUserPermissions = (userId: number) => {
  return useQuery({
    queryKey: PERMISSION_QUERY_KEYS.userPermissions(userId),
    queryFn: () => PermissionApi.getUserPermissions(userId),
    enabled: !!userId,
  });
};


