import { createClient } from '@supabase/supabase-js';

// Only call this after checking USE_SUPABASE from config.ts.
// Returns null when env vars are missing (local demo mode).
export function getSupabaseClient() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon);
}
