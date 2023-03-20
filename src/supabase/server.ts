import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "./types";

export const createClient = () => {
	return createServerComponentSupabaseClient<Database>({
		headers,
		cookies,
	});
};
