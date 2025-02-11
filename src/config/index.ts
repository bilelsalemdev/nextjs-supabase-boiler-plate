export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  environment: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
} as const; 