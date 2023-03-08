import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./types";

export const createClient = () => createBrowserSupabaseClient<Database>();
