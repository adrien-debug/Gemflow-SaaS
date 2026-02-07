import { FC, PropsWithChildren, useEffect } from "react";
import { Navigate } from "react-router";
import LocalStorageService from "@shared/services/local-storage.service.ts";
import { StorageKey } from "@shared/constants/storage-key.ts";
import { AuthData } from "@entities/authorization/model/auth-data.model.ts";
import { UserProvider } from "@shared/providers/UserProvider.tsx";
import { isDevMode, mockDevAuthData } from "@shared/config/dev-mode.config.ts";

interface Props extends PropsWithChildren {
  redirectTo: string;
}

const PrivateRoute: FC<Props> = ({ redirectTo, children }) => {
  // Mode DEV : Auto-login avec mock user
  useEffect(() => {
    if (isDevMode) {
      const existingAuth = LocalStorageService.getItem(StorageKey.AuthData);
      if (!existingAuth) {
        console.log("🔧 DEV MODE: Auto-login activé");
        LocalStorageService.setItem(StorageKey.AuthData, mockDevAuthData);
      }
    }
  }, []);

  const authData = LocalStorageService.getItem(StorageKey.AuthData) as AuthData;

  // En mode DEV, toujours considérer comme authentifié
  if (!authData && !isDevMode) {
    return <Navigate to={redirectTo} replace />;
  }

  return <UserProvider>{children}</UserProvider>;
};

export default PrivateRoute;
