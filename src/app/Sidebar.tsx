import {
	Cog6ToothIcon,
	FolderIcon,
	HomeIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";

import Logo from "../public/logo.svg";
import UserCard from "./(components)/UserCard";

const navigation = [
	{ name: "Dashboard", href: "/flows", icon: HomeIcon, current: false },
	{ name: "Flows", href: "/flows", icon: FolderIcon, current: true },
	/* {
		name: "Team",
		href: "/settings/organization/users",
		icon: UsersIcon,
		current: false,
	}, */
	{
		name: "Settings",
		href: "/settings/organization",
		icon: Cog6ToothIcon,
		current: false,
	},
];

// TODO: go lighter on hover highlights (e.g. `filter: brightness(1.125)`)

export const Sidebar = () => (
	<aside className="flex absolute inset-y-0 w-64 z-10">
		<div className="flex flex-grow flex-col overflow-y-auto bg-primary-700 pt-5">
			<div className="flex flex-shrink-0 items-center px-4">
				<Image
					className="h-8 w-auto"
					src={Logo.src}
					alt="IDFlow"
					width={Logo.width}
					height={Logo.height}
					priority={true}
				/>
			</div>
			<div className="mt-5 flex flex-1 flex-col content-between">
				<nav className="flex-1 space-y-1 px-2 pb-4">
					{navigation.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className={clsx(
								item.current
									? "bg-primary-900 text-white"
									: "text-indigo-100 hover:bg-primary-500",
								"group flex items-center px-2 py-2 text-sm font-medium rounded-md"
							)}
						>
							<item.icon
								className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300"
								aria-hidden="true"
							/>
							{item.name}
						</a>
					))}
				</nav>
				<UserCard />
			</div>
		</div>
	</aside>
);

export default Sidebar;
