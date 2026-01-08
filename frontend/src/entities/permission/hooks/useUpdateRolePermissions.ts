import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PermissionApi } from '../api/permission.api';
import { PERMISSION_QUERY_KEYS } from '../constants/query-keys';
import type { UpdateRolePermissionsDto } from '../dto/update-role-permissions.dto';

export const useUpdateRolePermissions = (tenantId: number = 1) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateRolePermissionsDto) =>
      PermissionApi.updateRolePermissions(dto, tenantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSION_QUERY_KEYS.matrix(tenantId) });
    },
  });
};


