import { ButtonLink } from "../flow-editor/Button";
import FlowsList from "./FlowsList";

const Page = () => {
	return (
		<div className="p-3">
			<h1 className="font-semibold text-3xl mb-5">Flows</h1>
			<aside className="my-3 flex">
				<ButtonLink href="/flows/new" variant="primary" className="self-end">
					Create new flow
				</ButtonLink>
			</aside>

			<FlowsList />
		</div>
	);
};

export default Page;
