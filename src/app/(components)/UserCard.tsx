import { createClient } from "../utils/supabase/server";
import PlaceholderAvatar from "./PlaceholderAvatar";

// @ts-expect-error Async Server Component
const UserCard: React.FC<{}> = async () => {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	let displayName = "Login";
	if (data.user) {
		const { data: profile, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", data.user?.id)
			.single();
		if (error) {
			throw error;
		}
		displayName = profile.display_name ?? profile.email;
	}
	return (
		<div>
			<PlaceholderAvatar />
			{displayName}
		</div>
	);
};

export default UserCard;
