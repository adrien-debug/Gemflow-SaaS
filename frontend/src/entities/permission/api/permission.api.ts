import api from '@shared/api';
import type { Permission, RolePermissionsMatrix } from '../models/permission.model';
import type { UpdateRolePermissionsDto } from '../dto/update-role-permissions.dto';

const BASE_URL = '/api/v1/permissions';

export const PermissionApi = {
  /**
   * Get all available permissions
   */
  getAllPermissions: async (): Promise<Permission[]> => {
    return api.get(BASE_URL);
  },

  /**
   * Get permissions matrix for all roles
   */
  getPermissionsMatrix: async (tenantId: number = 1): Promise<RolePermissionsMatrix> => {
    return api.get(`${BASE_URL}/matrix`, { params: { tenantId } });
  },

  /**
   * Update permissions for a specific role
   */
  updateRolePermissions: async (
    dto: UpdateRolePermissionsDto,
    tenantId: number = 1
  ): Promise<void> => {
    return api.put(`${BASE_URL}/role`, dto, { params: { tenantId } });
  },

  /**
   * Check if user has a specific permission
   */
  hasPermission: async (userId: number, permissionCode: string): Promise<boolean> => {
    return api.get(`${BASE_URL}/check/${permissionCode}`, { params: { userId } });
  },

  /**
   * Get all permissions for a user
   */
  getUserPermissions: async (userId: number): Promise<string[]> => {
    return api.get(`${BASE_URL}/user/${userId}`);
  },
};


