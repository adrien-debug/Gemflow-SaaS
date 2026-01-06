import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";
import { useUser } from "@shared/hooks/useUser.ts";

interface Props extends PropsWithChildren {
  allowedRoles: UserRoleEnum[];
  redirectTo?: string;
}

export const UserRoute: FC<Props> = ({ allowedRoles, redirectTo = "/", children }) => {
  const { user } = useUser();

  // ⚠️ AUTHENTICATION DISABLED FOR DEVELOPMENT ⚠️
  // Bypass role-based access control
  // const hasRole = allowedRoles.some((role) => user?.role.code === role);

  // if (!user) return <Navigate to={"/login"} replace />;

  // if (!hasRole) {
  //   return <Navigate to={redirectTo} replace />;
  // }

  return <>{children}</>;
};
