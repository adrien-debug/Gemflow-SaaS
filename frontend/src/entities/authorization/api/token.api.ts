import LocalStorageService from "@shared/services/local-storage.service.ts";
import { environment } from "@shared/constants/environment.ts";
import { AuthData } from "@entities/authorization/model/auth-data.model.ts";
import { StorageKey } from "@shared/constants/storage-key.ts";
import { GrantType } from "@shared/constants/grant-type.ts";
import axios from "axios";

const authApiInstance = axios.create({
  baseURL: environment.authURL,
  timeout: 10000,
});

const TokenApi = {
  refreshAccessToken: async (): Promise<AuthData> => {
    const authData = LocalStorageService.getItem<AuthData>(StorageKey.AuthData) as AuthData;
    if (!authData?.refresh_token) {
      throw {};
    }
    if (environment.authClientSecret) {
      // eslint-disable-next-line no-console
      console.warn(
        "[auth] VITE_AUTH_CLIENT_SECRET is set. This value is bundled into the frontend and should not be a secret for SPA deployments.",
      );
    }
    const response = await authApiInstance.post<AuthData>(
      `/realms/${environment.authRealm}/protocol/openid-connect/token`,
      new URLSearchParams({
        refresh_token: authData.refresh_token,
        scope: environment.authScope,
        client_id: environment.authClientId,
        grant_type: GrantType.RefreshToken,
        ...(environment.authClientSecret ? { client_secret: environment.authClientSecret } : {}),
      }),
    );
    return response.data;
  },

  getAccessToken: async (username: string, password: string): Promise<AuthData> => {
    if (environment.authClientSecret) {
      // eslint-disable-next-line no-console
      console.warn(
        "[auth] VITE_AUTH_CLIENT_SECRET is set. This value is bundled into the frontend and should not be a secret for SPA deployments.",
      );
    }
    const response = await authApiInstance.post<AuthData>(
      `/realms/${environment.authRealm}/protocol/openid-connect/token`,
      new URLSearchParams({
        username,
        password,
        scope: environment.authScope,
        client_id: environment.authClientId,
        grant_type: GrantType.Password,
        ...(environment.authClientSecret ? { client_secret: environment.authClientSecret } : {}),
      }),
    );
    return response.data;
  },

  clearAuthData: (): void => {
    LocalStorageService.deleteItem(StorageKey.AuthData);
  },
};

export default TokenApi;
