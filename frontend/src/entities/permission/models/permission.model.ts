export enum PermissionCategory {
  CLIENTS = 'CLIENTS',
  ORDERS = 'ORDERS',
  INVENTORY = 'INVENTORY',
  SETTINGS = 'SETTINGS',
  REPORTS = 'REPORTS',
  FILES = 'FILES',
}

export interface Permission {
  id: number;
  code: string;
  name: string;
  description?: string;
  category: PermissionCategory;
}

export interface RolePermission {
  id: number;
  roleId: number;
  roleCode: string;
  roleName: string;
  permissionId: number;
  permissionCode: string;
  permissionName: string;
  granted: boolean;
}

export interface RolePermissionsMatrix {
  permissions: Permission[];
  roles: Array<{
    id: number;
    code: string;
    name: string;
  }>;
  // Map<roleId, Map<permissionId, granted>>
  matrix: Record<number, Record<number, boolean>>;
}


