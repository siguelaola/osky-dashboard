"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useSupabase } from "../(components)/supabase/SupabaseProvider";

const LoginPage: React.FC<{}> = () => {
	const { supabase } = useSupabase();

	// XXX Hack because <Auth/> is broken with appDir
	useEffect(() => {
		const submitButton = document
			.getElementById("auth-sign-in")
			?.querySelector<HTMLButtonElement>("button[type=submit]");

		if (submitButton) {
			submitButton.onclick = () => {
				setTimeout(async () => {
					const userResponse = await supabase.auth.getUser();
					console.log(userResponse);
					if (!userResponse.error) {
						window.location.href = "/flows";
					}
				}, 1000);
			};
		}
	});

	return (
		<Auth
			supabaseClient={supabase}
			appearance={{ theme: ThemeSupa }}
			redirectTo="/flows"
			providers={[]}
		/>
	);
};

export default LoginPage;
