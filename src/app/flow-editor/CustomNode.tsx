import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { memo } from "react";
import {
	applyEdgeChanges,
	applyNodeChanges,
	EdgeAddChange,
	Handle,
	NodeProps,
	Position,
	useReactFlow,
} from "reactflow";

const AddNodeButton: React.FC<{ id: string; xPos: number; yPos: number }> = ({
	id,
	xPos,
	yPos,
}) => {
	const { setNodes, setEdges } = useReactFlow();

	return (
		<button
			type="button"
			className="relative w-7 h-7"
			onClick={() => {
				const edgeChanges: EdgeAddChange[] = [];

				setNodes((nodes) => {
					const newId = `node-${nodes.length}`;
					edgeChanges.push({
						type: "add",
						item: {
							id: `edge-${id}-${newId}`,
							source: id,
							target: newId,
						},
					});

					return applyNodeChanges(
						[
							{
								type: "add",
								item: {
									id: newId,
									position: { x: xPos, y: yPos + 100 },
									data: { label: "New Screen" },
									type: "custom",
								},
							},
						],
						nodes
					);
				});

				setEdges((edges) => applyEdgeChanges(edgeChanges, edges));
			}}
		>
			<PlusCircleIcon className="w-7 h-7 bottom-0 bg-white hover:bg-gray-100 rounded-full absolute" />
		</button>
	);
};

const CustomNode: React.FC<NodeProps> = ({
	id,
	data,
	isConnectable,
	xPos,
	yPos,
}) => {
	return (
		<div className="flex flex-col bg-white border border-black p-5 rounded-md shadow-md font-semibold group w-[150px] text-center">
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
				style={{ visibility: "hidden" }}
			/>
			{data?.label}
			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={isConnectable}
				style={{ visibility: "hidden" }}
			/>
			<div className="mx-auto h-0 hidden group-hover:block">
				<AddNodeButton id={id} xPos={xPos} yPos={yPos} />
			</div>
		</div>
	);
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);
