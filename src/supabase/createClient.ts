import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://zmkaoxtedbqmpsgercdu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpta2FveHRlZGJxbXBzZ2VyY2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE1MDE4MTMsImV4cCI6MjAzNzA3NzgxM30.6EdP1W1WPmZTueA4jECzysL0END-i3CTqot8Q3jDjW8"
);
