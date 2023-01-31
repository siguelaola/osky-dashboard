import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import {
	applyNodeChanges,
	NodeProps,
	Position,
	useNodes,
	useReactFlow,
} from "reactflow";

/* Handles:
	<Handle
		type="target"
		position={targetPosition}
		isConnectable={isConnectable}
	/>
	<Handle
		type="source"
		position={sourcePosition}
		isConnectable={isConnectable}
	/>
*/

const CustomNode = ({
	data,
	isConnectable,
	xPos,
	yPos,
	targetPosition = Position.Top,
	sourcePosition = Position.Bottom,
}: NodeProps) => {
	const nodes = useNodes();
	const { project, setNodes } = useReactFlow();

	return (
		<div className="flex flex-col bg-white border border-black p-5 rounded-md shadow-md font-semibold group w-[150px] text-center">
			{data?.label}
			<div className="mx-auto h-0 hidden group-hover:block">
				<button
					type="button"
					className="relative w-7 h-7"
					onClick={(e) => {
						setNodes((nodes) =>
							applyNodeChanges(
								[
									{
										type: "add",
										item: {
											id: `node-${nodes.length}`,
											position: { x: xPos, y: yPos + 100 },
											data: { label: "New Screen" },
											type: "custom",
										},
									},
								],
								nodes
							)
						);
					}}
				>
					<PlusCircleIcon className="w-7 h-7 bottom-0 bg-white hover:bg-gray-100 rounded-full absolute" />
				</button>
			</div>
		</div>
	);
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
