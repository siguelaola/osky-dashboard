import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../utils/supabase/server";

export async function POST(request: NextRequest) {
	const res = NextResponse.redirect("/");
	res.cookies.set("supabase-auth-token", "");

	const supabase = createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (session) {
		await supabase.auth.admin.signOut(session.access_token);
	}

	return res;
}
