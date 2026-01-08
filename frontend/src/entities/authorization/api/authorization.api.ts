import { Credentials } from "@entities/authorization/model/credentials.model.ts";
import TokenApi from "@entities/authorization/api/token.api.ts";
import { AuthData } from "@entities/authorization/model/auth-data.model.ts";
import LocalStorageService from "@shared/services/local-storage.service.ts";
import { StorageKey } from "@shared/constants/storage-key.ts";
import api from "@shared/api";
import { TokenType } from "@entities/authorization/constants/token-type.enum.ts";

const AuthorizationApi = {
  login: async (credentials: Credentials): Promise<AuthData> => {
    const { login, password } = credentials;
    const authData = await TokenApi.getAccessToken(login, password);
    LocalStorageService.setItem(StorageKey.AuthData, authData);
    return authData;
  },

  forgotPassword: async (email: string): Promise<boolean> => {
    try {
      await api.post("/api/v1/users/password/restore", { email });
      return true;
    } catch {
      return false;
    }
  },

  updatePassword: async (token: string, password: string): Promise<boolean> => {
    try {
      await api.post("/api/v1/users/password/reset", { tokenValue: token, newPassword: password });
      return true;
    } catch {
      return false;
    }
  },

  checkTokenExpiration: async (token: string, tokenType: TokenType): Promise<boolean> => {
    try {
      const response = await api.get<{ expired: boolean }>(`/api/v1/tokens/values/${token}/types/${tokenType}/check`);
      return !!response?.expired;
    } catch {
      return true;
    }
  },

  logout: () => TokenApi.clearAuthData(),
};

export default AuthorizationApi;
