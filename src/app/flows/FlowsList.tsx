import { CalendarIcon, UsersIcon } from "@heroicons/react/20/solid";
import { createClient } from "../utils/supabase/server";

// @ts-expect-error Async Server Component
const FlowsList: React.FC<{}> = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from("flows").select("*");
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
		};
	});

	return (
		<div className="overflow-hidden bg-white shadow sm:rounded-md">
			<ul role="list" className="divide-y divide-gray-200">
				{flows.map((flow) => (
					<li key={flow.id}>
						<a href={flow.href} className="block hover:bg-gray-50">
							<div className="px-4 py-4 sm:px-6">
								<div className="flex items-center justify-between">
									<p className="truncate text-sm font-medium text-indigo-600">
										{flow.title}
									</p>
									<div className="ml-2 flex flex-shrink-0">
										{flow.type === "live" ? (
											<p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
												Live
											</p>
										) : (
											<p className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-green-800">
												Disabled
											</p>
										)}
									</div>
								</div>
								<div className="mt-2 sm:flex sm:justify-between">
									<div className="sm:flex">
										<p className="flex items-center text-sm text-gray-500">
											<UsersIcon
												className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
												aria-hidden={true}
											/>
											{flow.sharing}
										</p>
									</div>
									<div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
										<CalendarIcon
											className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden={true}
										/>
										<p>
											Created{" "}
											<time dateTime={flow.closeDateFull.toISOString()}>
												{flow.closeDateFull.toLocaleDateString()}
											</time>
										</p>
									</div>
								</div>
							</div>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FlowsList;
