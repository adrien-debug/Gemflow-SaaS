import LocalStorageService from "@shared/services/local-storage.service.ts";
import { AuthData } from "@entities/authorization/model/auth-data.model.ts";
import { StorageKey } from "@shared/constants/storage-key.ts";
import { supabase } from "@shared/services/supabase.service.ts";

const TokenApi = {
  refreshAccessToken: async (): Promise<AuthData> => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error || !data.session) {
      throw error || new Error('No session');
    }
    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in || 3600,
      token_type: 'Bearer',
    };
  },

  getAccessToken: async (username: string, password: string): Promise<AuthData> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    
    if (error) {
      console.error('Supabase auth error:', error);
      throw error;
    }
    
    if (!data.session) {
      throw new Error('No session returned');
    }
    
    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in || 3600,
      token_type: 'Bearer',
    };
  },

  clearAuthData: (): void => {
    LocalStorageService.deleteItem(StorageKey.AuthData);
    supabase.auth.signOut();
  },
};

export default TokenApi;
