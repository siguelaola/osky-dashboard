import { createClient } from "../../../supabase/server";
import NewFlow from "./NewFlow";

const Page = async () => {
	const supabase = createClient();
	const { data: flows, error } = await supabase
		.from("flows")
		.select("*")
		.eq("is_starter", true);
	if (error) {
		throw error;
	}
	return (
		<div className="p-3 flex my-auto flex-col items-center">
			<div className="flex flex-col h-screen justify-center">
				<NewFlow starters={flows} />
			</div>
		</div>
	);
};

export default Page;
