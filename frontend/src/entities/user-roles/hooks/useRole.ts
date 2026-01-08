import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";
import { useUser } from "@shared/hooks/useUser.ts";
import { useMemo } from "react";

export const useRole = () => {
  const { user } = useUser();

  const hasRole = useMemo(() => {
    return (requiredRoles: UserRoleEnum[]): boolean => {
      if (!user?.role?.code) return false;

      return requiredRoles.some((role) => user.role.code === role);
    };
  }, [user]);

  return { hasRole };
};
