import { useQuery } from '@tanstack/react-query';
import { PermissionApi } from '../api/permission.api';
import { PERMISSION_QUERY_KEYS } from '../constants/query-keys';

export const usePermissions = () => {
  return useQuery({
    queryKey: PERMISSION_QUERY_KEYS.list(),
    queryFn: () => PermissionApi.getAllPermissions(),
  });
};


