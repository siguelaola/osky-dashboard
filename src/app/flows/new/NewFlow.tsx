"use client";
import { useSupabase } from "../../(components)/supabase/SupabaseProvider";
import { Json } from "../../../supabase/types";
import Button from "../../flow-editor/Button";

const NewFlow = ({
	starters,
}: {
	starters: Array<{ title: string; data: any }>;
}) => {
	const { supabase } = useSupabase();
	const getOrganizationId = async () => {
		const { data, error } = await supabase
			.from("organization_members")
			.select("organization_id")
			.limit(1)
			.single();
		if (error) {
			throw error;
		}
		return data.organization_id;
	};
	return (
		<>
			<h1 className="font-semibold text-3xl mb-5">Create a new flow</h1>

			<div className="w-full flex justify-center">
				<Button
					onClick={async () => {
						const organization_id = await getOrganizationId();
						const { data, error } = await supabase
							.from("flows")
							.insert({
								organization_id,
								title: `New Blank Flow`,
								data: {},
							})
							.select("id");
						if (error) {
							throw error;
						}
						window.location.pathname = `/flows/${data[0].id}`;
					}}
					className="px-5 py-10 text-xl"
				>
					Blank flow
				</Button>
			</div>

			<h2 className="text-3xl font-semibold mb-5 mt-10">
				Or start from a template
			</h2>

			<div className="grid grid-cols-2 gap-3 max-w-lg">
				{starters.map((starter) => (
					<Button
						onClick={async () => {
							const organization_id = await getOrganizationId();
							const { data, error } = await supabase
								.from("flows")
								.insert({
									organization_id,
									title: `Copy of ${starter.title}`,
									data: starter.data as Json,
								})
								.select("id");
							if (error) {
								throw error;
							}
							window.location.pathname = `/flows/${data[0].id}`;
						}}
						className="px-5 py-10 text-xl"
					>
						{starter.title}
					</Button>
				))}
			</div>
		</>
	);
};

export default NewFlow;
