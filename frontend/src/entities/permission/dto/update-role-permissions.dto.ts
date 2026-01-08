export interface PermissionUpdate {
  permissionId: number;
  granted: boolean;
}

export interface UpdateRolePermissionsDto {
  roleId: number;
  permissions: PermissionUpdate[];
}


