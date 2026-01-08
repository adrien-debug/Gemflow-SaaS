import { FC, PropsWithChildren } from "react";
import LocalStorageService from "@shared/services/local-storage.service.ts";
import { StorageKey } from "@shared/constants/storage-key.ts";
import { AuthData } from "@entities/authorization/model/auth-data.model.ts";
import { UserProvider } from "@shared/providers/UserProvider.tsx";

interface Props extends PropsWithChildren {
  redirectTo: string;
}

const PrivateRoute: FC<Props> = ({ redirectTo: _redirectTo, children }) => {
  // ⚠️ AUTHENTICATION DISABLED FOR DEVELOPMENT ⚠️
  // Bypass authentication check - always allow access
  LocalStorageService.getItem(StorageKey.AuthData) as AuthData;

  // if (!authData) {
  //   return <Navigate to={redirectTo} replace />;
  // }

  return <UserProvider>{children}</UserProvider>;
};

export default PrivateRoute;
