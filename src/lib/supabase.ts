// Verbindung zur Supabase-Datenbank der Seite "Aktuelles".
// Die Zugangsdaten stehen in der Datei .env (VITE_SUPABASE_URL und
// VITE_SUPABASE_ANON_KEY). Der "anon"-Schlüssel darf öffentlich sein:
// Was damit erlaubt ist, regeln die Zugriffsregeln (RLS) in der Datenbank.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseKonfiguriert = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!client) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error(
        'Supabase ist nicht konfiguriert: VITE_SUPABASE_URL und VITE_SUPABASE_ANON_KEY fehlen in der Datei .env.'
      );
    }
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}
