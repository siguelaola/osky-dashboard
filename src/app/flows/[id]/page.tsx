import FlowEditor from "../../flow-editor/FlowEditor";
import { createClient } from "../../utils/supabase/server";

// @ts-expect-error Async Server Component
const Page: React.FC<{ params: { id: string } }> = async ({
	params: { id },
}) => {
	const supabase = createClient();
	const { data: flow, error } = await supabase
		.from("flows")
		.select("*")
		.eq("id", id)
		.single();
	if (error) {
		throw error;
	}
	return (
		<FlowEditor
			id={id}
			nodes={(flow.data as any)?.nodes}
			edges={(flow.data as any)?.edges}
		/>
	);
};

export default Page;
