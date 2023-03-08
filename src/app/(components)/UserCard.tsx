import { createClient } from "../utils/supabase/server";
import PlaceholderAvatar from "./PlaceholderAvatar";

// @ts-expect-error Async Server Component
const UserCard: React.FC<{}> = async () => {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();
	if (data.user) {
		const { data: profile, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", data.user?.id)
			.single();
		if (error) {
			throw error;
		}
		return (
			<div>
				<PlaceholderAvatar />
				<div>{profile.display_name ?? profile.email}</div>
				<div>
					<form action="/logout" method="post">
						<button type="submit">Logout</button>
					</form>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<a href="/login">Login</a>
			</div>
		);
	}
};

export default UserCard;
