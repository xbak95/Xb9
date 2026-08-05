import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase lato browser. Se le variabili d'ambiente non sono
 * configurate, l'app resta pienamente funzionante usando i dati demo
 * in /data — questo client viene semplicemente ignorato dalle pagine.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createBrowserClient(url, key);
}

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
