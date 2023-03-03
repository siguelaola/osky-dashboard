import clsx from "clsx";
import Link from "next/link";

const tabs = [
	{ name: "General", href: "/settings/organization" },
	{ name: "Team", href: "/settings/organization/users" },
	{ name: "Billing", href: "/settings/organization/billing" },
];

export const OrgSettingsNavigation: React.FC = () => {
	// Impossible to implement in app dir for now.
	// See: https://github.com/vercel/next.js/issues/43704
	const isCurrent = (href: string) => false;

	return (
		<div className="mb-5">
			<div className="sm:hidden">
				<select
					id="tabs"
					name="tabs"
					className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					defaultValue={tabs.find((tab) => isCurrent(tab.href))?.name}
				>
					{tabs.map((tab) => (
						<option key={tab.name}>{tab.name}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex space-x-8" aria-label="Tabs">
						{tabs.map((tab) => (
							<Link
								key={tab.name}
								href={tab.href}
								className={clsx(
									isCurrent(tab.href)
										? "border-indigo-500 text-indigo-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
									"whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
								)}
							>
								{tab.name}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
};

export default OrgSettingsNavigation;
