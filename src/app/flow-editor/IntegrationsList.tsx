import { EnvelopeIcon } from "@heroicons/react/24/outline";

const IntegrationListItem: React.FC<{
	name: string;
	description: string;
	icon: JSX.Element;
}> = ({ name, description, icon }) => (
	<li className="border p-3 mb-2 shadow-sm cursor-grab flex items-center justify-between">
		<div className="flex items-center">
			{icon}
			<div className="ml-4">
				<div className="text-sm font-medium text-gray-900">{name}</div>
				<div className="text-sm text-gray-500">{description}</div>
			</div>
		</div>
	</li>
);

export const IntegrationList = () => (
	<div className="bg-white self-end h-full z-10 shadow-md m-3 p-3 w-64">
		<ul>
			<IntegrationListItem
				name="Email"
				description="Send an email"
				icon={<EnvelopeIcon className="h-10 w-10 text-primary-600" />}
			/>
		</ul>
	</div>
);

export default IntegrationList;
