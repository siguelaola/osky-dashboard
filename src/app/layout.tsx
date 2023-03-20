import "server-only";

import "../styles/tailwind.css";
import { createClient } from "../supabase/server";
import SupabaseListener from "./(components)/supabase/SupabaseListener";
import SupabaseProvider from "./(components)/supabase/SupabaseProvider";
import Footer from "./Footer";
import Head from "./head";
import Sidebar from "./Sidebar";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = createClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<html lang="en">
			<Head />
			<body className="flex">
				<SupabaseProvider>
					<SupabaseListener serverAccessToken={session?.access_token} />
					<Sidebar />
					<main className="w-full pl-64">{children}</main>
					<div
						id="modal-portal-root"
						className="absolute w-full h-full z-10 empty:hidden flex justify-center items-center"
					/>
					<Footer />
				</SupabaseProvider>
			</body>
		</html>
	);
};

export default RootLayout;
