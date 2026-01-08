import { useRole } from "@entities/user-roles/hooks/useRole.ts";
import { FC, PropsWithChildren, ReactNode } from "react";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";

interface Props extends PropsWithChildren {
  role: UserRoleEnum[];
  fallback?: ReactNode;
}

export const RoleGuard: FC<Props> = ({ role, children, fallback = null }) => {
  const { hasRole } = useRole();

  return hasRole(role) ? <>{children}</> : <>{fallback}</>;
};
