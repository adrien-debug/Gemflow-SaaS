export const environment = {
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
} as const;
