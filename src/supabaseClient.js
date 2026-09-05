import { createClient } from "@supabase/supabase-js";

// Public project credentials. RLS in the database enforces all private access.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://hdkdizoodcnznifvikpp.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhka2Rpem9vZGNuem5pZnZpa3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDU1MDMsImV4cCI6MjA4NTcyMTUwM30.xq9ga6yjiaoVuyBD09W8y602moA1_UQTLXHgiywOqXE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (input, options = {}) =>
      fetch(input, {
        ...options,
        signal: options.signal
          ? AbortSignal.any([options.signal, AbortSignal.timeout(15000)])
          : AbortSignal.timeout(15000),
      }),
  },
});
