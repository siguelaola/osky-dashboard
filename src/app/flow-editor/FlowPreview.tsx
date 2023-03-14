import { StateMachine } from "osky-ui";
import { useReactFlow } from "reactflow";

import type { Edge, Node } from "reactflow";
import type { NodeScreen } from "osky-ui/dist/interfaces/types";

const FlowPreview = () => {
	const flow = useReactFlow();
	const nodes = flow.getNodes();
	const edges = flow.getEdges();

	return (
		<div className="bg-white h-full w-[min(calc(100%-20rem),70rem)] z-10 shadow-lg rounded-lg p-3 mr-3">
			<StateMachine session={{ nodes: nodes as NodeScreen[], edges }} />
		</div>
	);
};

export default FlowPreview;
