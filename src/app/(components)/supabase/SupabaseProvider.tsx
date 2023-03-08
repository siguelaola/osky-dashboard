"use client";

import { createContext, useContext, useState } from "react";
import { createClient } from "../../utils/supabase/client";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../utils/supabase/types";

type SupabaseContext = {
	supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
	const [supabase] = useState(() => createClient());

	return (
		<Context.Provider value={{ supabase }}>
			<>{children}</>
		</Context.Provider>
	);
};

export default SupabaseProvider;

export const useSupabase = () => {
	let context = useContext(Context);
	if (context === undefined) {
		throw new Error("useSupabase must be used inside SupabaseProvider");
	} else {
		return context;
	}
};
