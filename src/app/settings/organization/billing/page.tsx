import BillingDetailsForm from "./OrganizationBillingPage";

const Page = async () => {
	return (
		<div className="px-4 sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">
						Billing settings
					</h1>
				</div>
			</div>
			<div className="mt-8 flex flex-col">
				<BillingDetailsForm />
			</div>
		</div>
	);
};

export default Page;
