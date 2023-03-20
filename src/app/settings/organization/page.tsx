import { createClient } from "../../../supabase/server";
import EditOrganizationDetailsPage from "./EditOrganizationDetailsPage";

const Page = async () => {
	const supabase = createClient();
	const { data: organization, error } = await supabase
		.from("organizations")
		.select("*")
		.limit(1) // TODO: Support multiple organizations
		.single();
	if (error) {
		throw error;
	}
	return <EditOrganizationDetailsPage organization={organization} />;
};

export default Page;
