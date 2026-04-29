// client/src/app/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.");
}

if (supabaseAnonKey.startsWith("sb_secret_")) {
  throw new Error(
    "VITE_SUPABASE_ANON_KEY must be a publishable/anon key, not a Supabase secret key."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
