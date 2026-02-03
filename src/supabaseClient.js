import { createClient } from '@supabase/supabase-js'

// Hardcoded keys to bypass Vercel environment variable issues
const supabaseUrl = 'https://hdkdizoodcnznifvikpp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhka2Rpem9vZGNuem5pZnZpa3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDU1MDMsImV4cCI6MjA4NTcyMTUwM30.xq9ga6yjiaoVuyBD09W8y602moA1_UQTLXHgiywOqXE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
