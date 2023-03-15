"use client";
import React, { useState } from "react";
import LabelledArea from "../../(components)/forms/LabelledArea";
import Notification from "../../(components)/Notification";
import { useSupabase } from "../../(components)/supabase/SupabaseProvider";
import Button from "../../flow-editor/Button";
import { Database } from "../../utils/supabase/types";

type Organization = Database["public"]["Tables"]["organizations"]["Row"];

const EditOrganizationDetailsPage: React.FC<{ organization: Organization }> = ({
	organization,
}) => {
	const [name, setName] = useState(organization.name);
	const [error, setError] = useState("");
	const { supabase } = useSupabase();

	const save = async () => {
		const { error } = await supabase
			.from("organizations")
			.update({ name, updated_at: "now()" })
			.eq("id", organization.id);
		if (error) {
			console.error(error);
			setError(error.message);
		}
	};

	return (
		<form
			className="space-y-8 divide-y divide-gray-200"
			onSubmit={async (e) => {
				e.preventDefault();
			}}
		>
			<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
				<div className="space-y-6 sm:space-y-5">
					<div>
						<h3 className="text-lg font-medium leading-6 text-gray-900">
							Company details
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							This information will be displayed on your screens.
						</p>
					</div>

					{error ? (
						<Notification title="Error" message={error} type="error" />
					) : null}

					<div className="space-y-6 sm:space-y-5 max-w-lg">
						{/* <LabelledArea id="photo" label="Company logo">
							<div className="flex justify-between">
								<input
									type="file"
									hidden
									id="logo-file-input"
									onChange={() => setError("Error uploading company logo.")}
								/>
								<Button
									type="button"
									onClick={() =>
										document.getElementById("logo-file-input")?.click()
									}
								>
									Change
								</Button>
								<PlaceholderAvatar />
							</div>
						</LabelledArea> */}
						<LabelledArea id="name" label="Company name">
							<input
								type="text"
								name="name"
								id="name"
								className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm p-2"
								value={name}
								onChange={(e) => setName(e.currentTarget.value)}
								required
							/>
						</LabelledArea>
					</div>
				</div>
			</div>

			<div className="pt-5 flex justify-end">
				<Button
					variant="primary"
					type="submit"
					onClick={(e) => {
						e.preventDefault();
						save();
					}}
				>
					Save
				</Button>
			</div>
		</form>
	);
};

export default EditOrganizationDetailsPage;
