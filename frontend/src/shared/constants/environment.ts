export const environment = {
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  authURL: import.meta.env.VITE_AUTH_HOST,
  authRealm: import.meta.env.VITE_AUTH_REALM,
  authClientId: import.meta.env.VITE_AUTH_CLIENT_ID,
  // ⚠️ VITE_* vars are exposed to the browser. Prefer NOT setting a client secret for SPA deployments.
  authClientSecret: import.meta.env.VITE_AUTH_CLIENT_SECRET,
  authScope: import.meta.env.VITE_AUTH_CLIENT_SCOPE,
} as const;
