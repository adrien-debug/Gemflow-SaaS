import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model";
import { filterMenuByRoles } from "@entities/user-roles/lib/filter-menu-roles";
import { useRole } from "@entities/user-roles/hooks/useRole";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum";

interface Props<T> {
  menuItems: T[];
  rolesMap: Record<string, UserRoleEnum[]>;
}

export const useFilterMenuByRoles = <T extends MenuItem>({ menuItems, rolesMap }: Props<T>): T[] => {
  const { hasRole } = useRole();

  return filterMenuByRoles(menuItems, hasRole, rolesMap);
};
