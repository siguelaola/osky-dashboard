"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../(components)/supabase/SupabaseProvider";

const LoginPage: React.FC<{}> = () => {
	const { supabase } = useSupabase();
	return (
		<Auth
			supabaseClient={supabase}
			appearance={{ theme: ThemeSupa }}
			redirectTo="flows"
			providers={[]}
		/>
	);
};

export default LoginPage;
