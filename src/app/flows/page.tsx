import { ButtonLink } from "../flow-editor/Button";
import FlowsList from "./FlowsList";

const Page = () => {
	return (
		<div className="flex flex-col p-3 bg-slate-100 h-screen overflow-auto pb-8">
			<div className="flex items-center mb-2">
				<h1 className="font-semibold text-3xl self-start">Flows</h1>
				<aside className="flex gap-x-2 ml-auto">
					<ButtonLink href="/flows/new" variant="primary" className="self-end">
						Create new flow
					</ButtonLink>
				</aside>
			</div>

			<FlowsList />
		</div>
	);
};

export default Page;
