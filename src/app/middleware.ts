import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "../supabase/types";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const supabase = createMiddlewareSupabaseClient<Database>({ req, res });

	// refresh access token if necessary
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return res;
}
