import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum";

export const filterMenuByRoles = <T extends MenuItem>(
  menuItems: T[],
  hasRole: (roles: UserRoleEnum[]) => boolean,
  rolesMap: Record<string, UserRoleEnum[]>,
): T[] => {
  return menuItems
    .filter((item: T) => {
      const allowedRoles = rolesMap[item.key as string];

      if (!allowedRoles) return true;

      return hasRole(allowedRoles);
    })
    .map((item) => {
      if (Array.isArray(item.children) && item.children.length) {
        return {
          ...item,
          children: filterMenuByRoles(item.children as MenuItem[], hasRole, rolesMap),
        };
      }
      return item;
    })
    .filter((item) => !(Array.isArray(item.children) && item.children.length === 0));
};
