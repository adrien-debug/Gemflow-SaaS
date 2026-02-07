export interface AuthData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  // Optional Keycloak-specific fields (not used with Supabase)
  "not-before-policy"?: number;
  refresh_expires_in?: number;
  scope?: string;
  session_state?: string;
}
