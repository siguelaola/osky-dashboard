import React from "react";
import { createClient } from "../utils/supabase/server";
import PlaceholderAvatar from "./PlaceholderAvatar";

interface UserProfile {
	created_at: string;
	display_name: string | null;
	email: string;
	id: string;
	updated_at: string;
}

const UserCardContainer = ({ children }: { children: React.ReactNode }) => {
	return <div className="bg-primary-900 rounded-t-lg py-2">{children}</div>;
};

const LoginComponent = () => {
	return <a className="block mx-2 py-2 bg-primary-600 hover:bg-primary-500 rounded text-gray-200 hover:text-white" href="/login">Login</a>;
};

const CardComponent: React.FC<{ profile: UserProfile }> = ({ profile }) => {
	return (
		<>
			<PlaceholderAvatar className="mb-1 -mt-[50%]" />
			<div className="mb-1 text-gray-200">
				{profile.display_name ?? profile.email}
			</div>
			<form
				action="/logout"
				method="post"
				className="block mx-2 bg-primary-600 hover:bg-primary-500 rounded text-gray-200 hover:text-white"
			>
				<button type="submit" className="w-full h-full py-2">
					Logout
				</button>
			</form>
		</>
	);
};

// @ts-expect-error Async Server Component
const UserCard: React.FC<{}> = async () => {
	const supabase = createClient();
	const { data } = await supabase.auth.getUser();

	if (!data.user)
		return (
			<UserCardContainer>
				<LoginComponent />
			</UserCardContainer>
		);

	const { data: profile, error } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", data.user?.id)
		.single();
	if (error) {
		throw error;
	}

	return (
		<UserCardContainer>
			<CardComponent profile={profile} />
		</UserCardContainer>
	);
};

export default UserCard;
