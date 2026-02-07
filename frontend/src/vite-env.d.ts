/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_HOST: string;
  readonly VITE_AUTH_HOST: string;
  readonly VITE_AUTH_REALM: string;
  readonly VITE_AUTH_CLIENT_ID: string;
  readonly VITE_AUTH_CLIENT_SECRET?: string;
  readonly VITE_AUTH_CLIENT_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
