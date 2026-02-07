import { FC, PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";
import { UserContext } from "@shared/providers/UserProvider.tsx";

interface Props extends PropsWithChildren {
  allowedRoles: UserRoleEnum[];
  redirectTo?: string;
}

export const UserRoute: FC<Props> = ({ allowedRoles, redirectTo = "/", children }) => {
  const { user } = useContext(UserContext);

  // ✅ Authentication enabled - enforce role-based access control
  const hasRole = allowedRoles.some((role) => user?.role.code === role);

  if (!user) return <Navigate to={"/login"} replace />;

  if (!hasRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
