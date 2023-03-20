import { CalendarIcon, UsersIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";
import { createClient } from "../../supabase/server";
import { ButtonLink } from "../flow-editor/Button";

const toTitleCase = (string: string) => {
	return (
		string[0].toUpperCase() + string.substring(1, string.length).toLowerCase()
	);
};

interface FlowDescriptor {
	id: string;
	title: string;
	type: "live" | "disabled";
	sharing: "Public" | "Private";
	closeDateFull: Date;
	href: string;
}

const FlowElement: React.FC<{ flow: FlowDescriptor }> = ({
	flow: { id, href, title, type, sharing, closeDateFull },
}) => {
	return (
		<li key={id}>
			<a href={href} className="block hover:bg-gray-50">
				<div className="px-4 py-4 sm:px-6">
					<div className="flex items-center justify-between">
						<span className="truncate text-sm font-medium text-indigo-600">
							{title}
						</span>
						<div className="ml-2 flex flex-shrink-0">
							<span
								className={clsx([
									"inline-flex rounded-full px-2 text-xs font-semibold leading-5 text-green-800",
									type === "live" ? "bg-green-100" : "bg-red-100",
								])}
							>
								{toTitleCase(type)}
							</span>
						</div>
					</div>
					<div className="mt-2 sm:flex sm:justify-between">
						<div className="sm:flex">
							<span className="flex items-center text-sm text-gray-500">
								<UsersIcon
									className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden={true}
								/>
								{sharing}
							</span>
						</div>
						<div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
							<CalendarIcon
								className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
								aria-hidden={true}
							/>
							<span>
								Created{" "}
								<time dateTime={closeDateFull.toISOString()}>
									{closeDateFull.toLocaleDateString()}
								</time>
							</span>
						</div>
					</div>
				</div>
			</a>
		</li>
	);
};

// @ts-expect-error Async Server Component
const FlowsList: React.FC<{}> = async () => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("flows")
		.select("*")
		.eq("is_starter", false);
	if (error) {
		throw error;
	}
	const flows = data.map((flow) => {
		return {
			id: flow.id,
			title: flow.title,
			type: flow.is_live ? "live" : "disabled",
			sharing: flow.is_public ? "Public" : "Private",
			closeDateFull: new Date(flow.created_at),
			href: `/flows/${flow.id}`,
		} as FlowDescriptor;
	});

	return flows.length === 0 ? (
		<div className="flex flex-col flex-grow items-center justify-center">
			<span className="text-2xl text-gray-400">
				There are no flows currently
			</span>
			<span className="text-2xl text-gray-400 mt-2">
				Press
				<ButtonLink
					href="/flows/new"
					variant="primary"
					className="self-end mx-2"
				>
					Create new flow
				</ButtonLink>
				to start one
			</span>
		</div>
	) : (
		<div className="overflow-hidden bg-white shadow sm:rounded-md">
			<ul role="list" className="divide-y divide-gray-200">
				{flows.map((flow) => (
					<FlowElement key={flow.id} flow={flow} />
				))}
			</ul>
		</div>
	);
};

export default FlowsList;
