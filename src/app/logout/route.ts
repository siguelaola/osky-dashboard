import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../supabase/server";

export async function POST(request: NextRequest) {
	const url = request.nextUrl.clone();
	url.pathname = "/";
	const res = NextResponse.redirect(url, 302);
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
