"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "../(components)/supabase/SupabaseProvider";

const Login: React.FC<{}> = () => {
	const { supabase } = useSupabase();
	return (
		<div className="max-w-md p-8 m-auto mt-4">
			<Auth
				supabaseClient={supabase}
				appearance={{ theme: ThemeSupa }}
				redirectTo="/flows"
			/>
		</div>
	);
};

export default Login;
