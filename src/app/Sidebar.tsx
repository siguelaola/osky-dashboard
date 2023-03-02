import {
	Cog6ToothIcon,
	FolderIcon,
	HomeIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";

import Logo from "../public/logo.svg";

const navigation = [
	{ name: "Dashboard", href: "#", icon: HomeIcon, current: false },
	{ name: "Flows", href: "/flow-editor", icon: FolderIcon, current: true },
	{ name: "Team", href: "#", icon: UsersIcon, current: false },
	{ name: "Settings", href: "#", icon: Cog6ToothIcon, current: false },
];

export const Sidebar = () => (
	<aside className="fixed inset-y-0 flex w-64 flex-col">
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
			<div className="mt-5 flex flex-1 flex-col">
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
			</div>
		</div>
	</aside>
);

export default Sidebar;
